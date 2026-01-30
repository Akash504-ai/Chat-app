import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageBubble from "./MessageBubble";
import { formatMessageTime } from "../lib/utils";

import FileMessage from "./FileMessage";
import AudioMessage from "./AudioMessage";

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
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

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

  return (
    <div className="flex flex-1 flex-col h-full min-h-0">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto px-2 sm:px-4 py-3 space-y-3 sm:space-y-4">
        {messages.map((message, idx) => {
          const isMe =
            typeof message.senderId === "string"
              ? message.senderId === authUser._id
              : message.senderId?._id === authUser._id;

          const isLast = idx === messages.length - 1;

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
              />
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <div className="shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;