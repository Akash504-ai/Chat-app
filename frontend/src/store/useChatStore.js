import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import { persist } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set, get) => ({
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
      clearedChats: {},

      clearSelectedChat: () =>
        set({
          selectedUser: null,
          selectedGroup: null,
          selectedChatType: "private",
          messages: [],
          typingUsers: {},
        }),

      clearChatForMe: (chatId) =>
        set((state) => ({
          clearedChats: {
            ...state.clearedChats,
            [chatId]: Date.now(),
          },
        })),

      togglePin: (chatId, messageId) =>
        set((state) => {
          const chatPins = state.pinnedMessages[chatId] || {};
          return {
            pinnedMessages: {
              ...state.pinnedMessages,
              [chatId]: {
                ...chatPins,
                [messageId]: !chatPins[messageId],
              },
            },
          };
        }),

      addReaction: (chatId, messageId, emoji) =>
        set((state) => ({
          reactions: {
            ...state.reactions,
            [chatId]: {
              ...(state.reactions[chatId] || {}),
              [messageId]:
                state.reactions?.[chatId]?.[messageId] === emoji ? null : emoji,
            },
          },
        })),

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
        } catch {
          toast.error("Failed to load messages");
        } finally {
          set({ isMessagesLoading: false });
        }
      },

      sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;
        if (get().selectedChatType !== "private") return;

        const res = await axiosInstance.post(
          `/messages/send/${selectedUser._id}`,
          messageData,
        );

        set({ messages: [...messages, res.data] });
      },

      getGroups: async () => {
        set({ isGroupsLoading: true });
        try {
          const res = await axiosInstance.get("/groups/my");
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
        if (get().selectedChatType !== "group") return;

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
          // ✅ backend will emit socket event
        } catch {
          toast.error("Failed to delete message");
        }
      },

      async sendMessageToAI(message) {
        const { messages, selectedUser } = get();
        if (!selectedUser) return;

        const authUser = useAuthStore.getState().authUser;

        const userMessage = {
          _id: crypto.randomUUID(),
          senderId: authUser._id,
          receiverId: selectedUser._id,
          text: message,
          status: "seen",
          createdAt: new Date().toISOString(),
        };

        set({ messages: [...messages, userMessage] });

        try {
          await axiosInstance.post("/ai/chat", { message });
        } catch {
          toast.error("Failed to send message to AI");
        }
      },

      startTyping: () => {
        const { selectedUser, selectedGroup, selectedChatType } = get();
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.emit("typing", {
          to:
            selectedChatType === "private"
              ? selectedUser?._id
              : selectedGroup?._id,
        });
      },

      stopTyping: () => {
        const { selectedUser, selectedGroup, selectedChatType } = get();
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.emit("stopTyping", {
          to:
            selectedChatType === "private"
              ? selectedUser?._id
              : selectedGroup?._id,
        });
      },

      subscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        // 🔥 clear old listeners (VERY IMPORTANT)
        socket.off("newMessage");
        socket.off("newGroupMessage");
        socket.off("typing");
        socket.off("stopTyping");
        socket.off("messageDeletedEveryone");
        socket.off("messageStatusUpdate");
        socket.off("messageStatusUpdateBulk");

        /* ---------- PRIVATE MESSAGE ---------- */
        socket.on("newMessage", (msg) => {
          const { selectedUser, selectedChatType } = get();
          const authUser = useAuthStore.getState().authUser;

          const senderId =
            typeof msg.senderId === "string" ? msg.senderId : msg.senderId?._id;

          const receiverId =
            typeof msg.receiverId === "string"
              ? msg.receiverId
              : msg.receiverId?._id;

          const chatUserId = senderId === authUser._id ? receiverId : senderId;

          if (
            selectedChatType === "private" &&
            selectedUser?._id === chatUserId
          ) {
            set((state) => ({
              messages: [...state.messages, msg],
            }));

            // 🔵 THIS IS THE KEY LINE
            axiosInstance.put(`/messages/mark-seen/${chatUserId}`);
          } else {
            // ✅ increment unread count
            set((state) => ({
              unreadCounts: {
                ...state.unreadCounts,
                [chatUserId]: (state.unreadCounts[chatUserId] || 0) + 1,
              },
            }));
          }
        });

        /* ---------- GROUP MESSAGE ---------- */
        socket.on("newGroupMessage", (msg) => {
          const { selectedGroup, selectedChatType } = get();

          if (
            selectedChatType === "group" &&
            selectedGroup?._id === msg.groupId
          ) {
            set((state) => ({
              messages: [...state.messages, msg],
            }));
          } else {
            set((state) => ({
              unreadCounts: {
                ...state.unreadCounts,
                [msg.groupId]: (state.unreadCounts[msg.groupId] || 0) + 1,
              },
            }));
          }
        });

        /* ---------- TYPING ---------- */
        socket.on("typing", ({ from }) => {
          set((state) => ({
            typingUsers: { ...state.typingUsers, [from]: true },
          }));
        });

        socket.on("stopTyping", ({ from }) => {
          set((state) => {
            const t = { ...state.typingUsers };
            delete t[from];
            return { typingUsers: t };
          });
        });

        /* ---------- DELETE FOR EVERYONE ---------- */
        socket.on("messageDeletedEveryone", ({ messageId }) => {
          set((state) => ({
            messages: state.messages.filter((m) => m._id !== messageId),
          }));
        });

        /* ---------- SEEN (BLUE TICK) ---------- */
        socket.on("messageStatusUpdateBulk", ({ messageIds, status }) => {
          set((state) => ({
            messages: state.messages.map((m) =>
              messageIds.includes(m._id) ? { ...m, status } : m,
            ),
          }));
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

      deleteGroup: async (groupId) => {
        try {
          await axiosInstance.delete(`/groups/${groupId}`);
          set((state) => ({
            groups: state.groups.filter((g) => g._id !== groupId),
          }));
          toast.success("Group deleted");
        } catch {
          toast.error("Failed to delete group");
        }
      },

      setSelectedUser: (user) =>
        set((state) => {
          axiosInstance.put(`/messages/mark-seen/${user._id}`);
          return {
            selectedUser: user,
            selectedGroup: null,
            selectedChatType: "private",
            messages: [],
            typingUsers: {},
            unreadCounts: {
              ...state.unreadCounts,
              [user._id]: 0,
            },
          };
        }),

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
    }),
    {
      name: "chat-ui-state",
      partialize: (state) => ({
        reactions: state.reactions,
        pinnedMessages: state.pinnedMessages,
        clearedChats: state.clearedChats,
      }),
    },
  ),
);
