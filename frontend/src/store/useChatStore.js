import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  selectedUser: null,
  selectedGroup: null,
  selectedChatType: "private",
  typingUsers: {},
  unreadCounts: {},
  isUsersLoading: false,
  isGroupsLoading: false,
  isMessagesLoading: false,
  reactions: {},
  pinnedMessages: {},
  
  togglePin: (messageId) =>
    set((state) => ({
      pinnedMessages: {
        ...state.pinnedMessages,
        [messageId]: !state.pinnedMessages[messageId],
      },
    })),

  addReaction: (messageId, emoji) =>
    set((state) => {
      const current = state.reactions[messageId];
      return {
        reactions: {
          ...state.reactions,
          [messageId]: current === emoji ? null : emoji,
        },
      };
    }),

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch {
      toast.error("Failed to load users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });

      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [userId]: 0,
        },
      }));

      const socket = useAuthStore.getState().socket;
      const unseenIds = res.data
        .filter(
          (m) =>
            (typeof m.senderId === "string" ? m.senderId : m.senderId?._id) ===
              userId && m.status !== "seen",
        )
        .map((m) => m._id);

      if (socket && unseenIds.length > 0) {
        socket.emit("messageSeen", {
          messageIds: unseenIds,
          senderId: userId,
        });
      }
    } catch {
      toast.error("Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    const res = await axiosInstance.post(
      `/messages/send/${selectedUser._id}`,
      messageData,
    );

    set({ messages: [...messages, res.data] });
  },

  getGroups: async () => {
    set({ isGroupsLoading: true });
    try {
      const res = await axiosInstance.get("/groups");
      set({ groups: res.data });
    } catch {
      toast.error("Failed to load groups");
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  getGroupMessages: async (groupId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/group/${groupId}`);
      set({ messages: res.data });

      set((state) => ({
        unreadCounts: {
          ...state.unreadCounts,
          [groupId]: 0,
        },
      }));
    } catch {
      toast.error("Failed to load group messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendGroupMessage: async (messageData) => {
    const { selectedGroup, messages } = get();
    if (!selectedGroup) return;

    const res = await axiosInstance.post(
      `/messages/group/send/${selectedGroup._id}`,
      messageData,
    );

    set({ messages: [...messages, res.data] });
  },

  deleteMessageForMe: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}/me`);
      set((state) => ({
        messages: state.messages.filter((m) => m._id !== messageId),
      }));
    } catch {
      toast.error("Failed to delete message");
    }
  },

  deleteMessageForEveryone: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/${messageId}/everyone`);
    } catch {
      toast.error("Failed to delete message");
    }
  },

  startTyping: () => {
    const { selectedUser, selectedGroup, selectedChatType } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.emit("typing", {
      to:
        selectedChatType === "private" ? selectedUser?._id : selectedGroup?._id,
    });
  },

  stopTyping: () => {
    const { selectedUser, selectedGroup, selectedChatType } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.emit("stopTyping", {
      to:
        selectedChatType === "private" ? selectedUser?._id : selectedGroup?._id,
    });
  },

  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (msg) => {
      const { selectedUser, selectedChatType, unreadCounts } = get();

      const senderId =
        typeof msg.senderId === "string" ? msg.senderId : msg.senderId?._id;

      if (selectedChatType !== "private" || selectedUser?._id !== senderId) {
        set({
          unreadCounts: {
            ...unreadCounts,
            [senderId]: (unreadCounts[senderId] || 0) + 1,
          },
        });
        return;
      }

      set({ messages: [...get().messages, msg] });
    });

    socket.on("newGroupMessage", (msg) => {
      const { selectedGroup, selectedChatType, unreadCounts } = get();

      if (selectedChatType !== "group" || selectedGroup?._id !== msg.groupId) {
        set({
          unreadCounts: {
            ...unreadCounts,
            [msg.groupId]: (unreadCounts[msg.groupId] || 0) + 1,
          },
        });
        return;
      }

      set({ messages: [...get().messages, msg] });
    });

    socket.on("messageDeletedEveryone", ({ messageId }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === messageId ? { ...m, deletedForEveryone: true } : m,
        ),
      }));
    });

    socket.on("messageStatusUpdate", ({ messageId, status }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          m._id === messageId ? { ...m, status } : m,
        ),
      }));
    });

    socket.on("messageStatusUpdateBulk", ({ messageIds, status }) => {
      set((state) => ({
        messages: state.messages.map((m) =>
          messageIds.includes(m._id) ? { ...m, status } : m,
        ),
      }));
    });

    socket.on("typing", ({ from }) => {
      set((state) => ({
        typingUsers: { ...state.typingUsers, [from]: true },
      }));
    });

    socket.on("stopTyping", ({ from }) => {
      set((state) => {
        const copy = { ...state.typingUsers };
        delete copy[from];
        return { typingUsers: copy };
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("newMessage");
    socket.off("newGroupMessage");
    socket.off("typing");
    socket.off("stopTyping");
    socket.off("messageStatusUpdate");
    socket.off("messageStatusUpdateBulk");
    socket.off("messageDeletedEveryone");
  },

  setSelectedUser: (user) =>
    set((state) => ({
      selectedUser: user,
      selectedGroup: null,
      selectedChatType: "private",
      messages: [],
      typingUsers: {},
      unreadCounts: {
        ...state.unreadCounts,
        [user?._id]: 0,
      },
    })),

  setSelectedGroup: (group) =>
    set((state) => ({
      selectedGroup: group,
      selectedUser: null,
      selectedChatType: "group",
      messages: [],
      typingUsers: {},
      unreadCounts: {
        ...state.unreadCounts,
        [group?._id]: 0,
      },
    })),
}));
