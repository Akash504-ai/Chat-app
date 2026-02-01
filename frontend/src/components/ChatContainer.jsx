import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion"; // Added for animation

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageBubble from "./MessageBubble.jsx";
import PinnedHeader from "./PinnedHeader.jsx";

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
    isAILoading, // Ensure this is in your useChatStore
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  const chatId =
    selectedChatType === "private" ? selectedUser?._id : selectedGroup?._id;

  const clearedAt = clearedChats?.[chatId];

  useEffect(() => {
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, selectedGroup?._id, selectedChatType]);

  useEffect(() => {
    if (selectedChatType === "private" && selectedUser?._id) {
      getMessages(selectedUser._id);
    }
    if (selectedChatType === "group" && selectedGroup?._id) {
      getGroupMessages(selectedGroup._id);
    }
  }, [selectedUser?._id, selectedGroup?._id, selectedChatType]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers, isAILoading]); // Trigger scroll on AI loading

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

  const visibleMessages = clearedAt
    ? messages.filter((msg) => new Date(msg.createdAt).getTime() > clearedAt)
    : messages;

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <ChatHeader />

      <PinnedHeader chatId={chatId} />

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
            <div key={message._id} ref={isLast ? bottomRef : null}>
              <MessageBubble
                message={message}
                sender={sender}
                isMe={isMe}
                chatType={selectedChatType}
                chatId={chatId}
              />
            </div>
          );
        })}

        {/* AI THINKING ANIMATION */}
        <AnimatePresence>
          {isAILoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="chat chat-start mb-4"
            >
              <div className="chat-image avatar">
                <div className="w-8 h-8 rounded-full ring-1 ring-primary animate-pulse">
                  <img src="/ai-avatar.png" alt="AI" />
                </div>
              </div>
              <div className="chat-bubble bg-base-200 text-primary flex items-center gap-1 py-3 px-4 rounded-2xl rounded-tl-none border border-primary/10 shadow-sm">
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
                <motion.span
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                  className="w-1.5 h-1.5 bg-primary rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <div className="shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
