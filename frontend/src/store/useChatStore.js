import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  // =====================
  // STATE
  // =====================
  messages: [],
  users: [],
  groups: [],

  selectedUser: null,
  selectedGroup: null,
  selectedChatType: "private",

  // 👇 typing users (key = userId)
  typingUsers: {},

  isUsersLoading: false,
  isGroupsLoading: false,
  isMessagesLoading: false,

  // =====================
  // USERS (PRIVATE CHAT)
  // =====================
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

  // =====================
  // GROUPS
  // =====================
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

  // =====================
  // GROUP ACTIONS
  // =====================
  deleteGroup: async (groupId) => {
    try {
      await axiosInstance.delete(`/groups/${groupId}`);
      set((state) => ({
        groups: state.groups.filter((g) => g._id !== groupId),
        selectedGroup: null,
        messages: [],
        selectedChatType: "private",
      }));
      toast.success("Group deleted");
    } catch {
      toast.error("Failed to delete group");
    }
  },

  leaveGroup: async (groupId) => {
    try {
      await axiosInstance.post(`/groups/${groupId}/leave`);
      set((state) => ({
        groups: state.groups.filter((g) => g._id !== groupId),
        selectedGroup: null,
        messages: [],
        selectedChatType: "private",
      }));
      toast.success("You left the group");
    } catch {
      toast.error("Failed to leave group");
    }
  },

  addGroupMember: async (groupId, userId) => {
    try {
      const res = await axiosInstance.post(`/groups/${groupId}/add-user`, {
        userId,
      });

      set((state) => ({
        groups: state.groups.map((g) => (g._id === groupId ? res.data : g)),
      }));

      toast.success("Member added");
    } catch {
      toast.error("Failed to add member");
    }
  },

  removeGroupMember: async (groupId, userId) => {
    try {
      const res = await axiosInstance.post(`/groups/${groupId}/remove-user`, {
        userId,
      });

      set((state) => ({
        groups: state.groups.map((g) => (g._id === groupId ? res.data : g)),
      }));

      toast.success("Member removed");
    } catch {
      toast.error("Failed to remove member");
    }
  },

  // =====================
  // ⌨️ TYPING INDICATOR
  // =====================
  startTyping: () => {
    console.log("⌨️ startTyping fired");
    const { selectedUser, selectedGroup, selectedChatType } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.emit("typing", {
      chatType: selectedChatType,
      to:
        selectedChatType === "private" ? selectedUser?._id : selectedGroup?._id,
    });
  },

  stopTyping: () => {
    console.log("🛑 stopTyping fired");
    const { selectedUser, selectedGroup, selectedChatType } = get();
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.emit("stopTyping", {
      chatType: selectedChatType,
      to:
        selectedChatType === "private" ? selectedUser?._id : selectedGroup?._id,
    });
  },

  // =====================
  // SOCKET
  // =====================
  subscribeToMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (msg) => {
      const { selectedUser, selectedChatType } = get();
      if (selectedChatType !== "private") return;
      if (msg.senderId !== selectedUser?._id) return;
      set({ messages: [...get().messages, msg] });
    });

    socket.on("newGroupMessage", (msg) => {
      const { selectedGroup, selectedChatType } = get();
      if (selectedChatType !== "group") return;
      if (msg.groupId !== selectedGroup?._id) return;
      set({ messages: [...get().messages, msg] });
    });

    // 👇 typing listeners
    socket.on("typing", ({ userId, chatType, to }) => {
      const { selectedChatType, selectedUser, selectedGroup } = get();

      // PRIVATE CHAT
      if (
        chatType === "private" &&
        selectedChatType === "private" &&
        selectedUser?._id === userId
      ) {
        set((state) => ({
          typingUsers: { ...state.typingUsers, [userId]: true },
        }));
      }

      // GROUP CHAT
      if (
        chatType === "group" &&
        selectedChatType === "group" &&
        selectedGroup?._id === to
      ) {
        set((state) => ({
          typingUsers: { ...state.typingUsers, [userId]: true },
        }));
      }
    });

    socket.on("stopTyping", ({ userId, chatType, to }) => {
      const { selectedChatType, selectedUser, selectedGroup } = get();

      const isSameChat =
        (chatType === "private" &&
          selectedChatType === "private" &&
          selectedUser?._id === userId) ||
        (chatType === "group" &&
          selectedChatType === "group" &&
          selectedGroup?._id === to);

      if (!isSameChat) return;

      set((state) => {
        const copy = { ...state.typingUsers };
        delete copy[userId];
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
  },

  // =====================
  // SELECTORS
  // =====================
  setSelectedUser: (user) =>
    set({
      selectedUser: user,
      selectedGroup: null,
      selectedChatType: "private",
      messages: [],
      typingUsers: {},
    }),

  setSelectedGroup: (group) =>
    set({
      selectedGroup: group,
      selectedUser: null,
      selectedChatType: "group",
      messages: [],
      typingUsers: {},
    }),
}));
