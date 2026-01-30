import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageBubble from "./MessageBubble";
import PinnedHeader from "./PinnedHeader";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    getGroupMessages,
    isMessagesLoading,
    selectedUser,
    selectedGroup,
    selectedChatType,
    subscribeToMessages,
    unsubscribeFromMessages,
    typingUsers,
    clearedChats,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  /* =====================
     CHAT ID (for clear chat)
     ===================== */
  const chatId =
    selectedChatType === "private"
      ? selectedUser?._id
      : selectedGroup?._id;

  const clearedAt = clearedChats?.[chatId];

  /* =====================
     SOCKET SUBSCRIBE
     ===================== */
  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, selectedGroup?._id, selectedChatType]);

  /* =====================
     FETCH MESSAGES
     ===================== */
  useEffect(() => {
    if (selectedChatType === "private" && selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    if (selectedChatType === "group" && selectedGroup?._id) {
      getGroupMessages(selectedGroup._id);
    }
  }, [selectedUser?._id, selectedGroup?._id, selectedChatType]);

  /* =====================
     AUTO SCROLL
     ===================== */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  if (!selectedUser && !selectedGroup) return null;

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col h-full min-h-0">
        <ChatHeader />
        <MessageSkeleton />
        <div className="shrink-0">
          <MessageInput />
        </div>
      </div>
    );
  }

  /* =====================
     CLEAR CHAT FILTER
     ===================== */
  const visibleMessages = clearedAt
    ? messages.filter(
        (msg) => new Date(msg.createdAt).getTime() > clearedAt
      )
    : messages;

  return (
    <div className="flex flex-1 flex-col h-full min-h-0">
      <ChatHeader />

      {/* 📌 PINNED HEADER */}
      <PinnedHeader />

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 space-y-3 sm:space-y-4">
        {visibleMessages.map((message, idx) => {
          const isMe =
            typeof message.senderId === "string"
              ? message.senderId === authUser._id
              : message.senderId?._id === authUser._id;

          const isLast = idx === visibleMessages.length - 1;

          const sender =
            selectedChatType === "group"
              ? message.senderId
              : isMe
              ? authUser
              : selectedUser;

          return (
            <div
              key={message._id}
              ref={isLast ? bottomRef : null}
            >
              <MessageBubble
                message={message}
                sender={sender}
                isMe={isMe}
                chatType={selectedChatType}
              />
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;