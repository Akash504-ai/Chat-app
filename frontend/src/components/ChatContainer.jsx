import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
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

  // =====================
  // FETCH MESSAGES
  // =====================
  useEffect(() => {
    if (selectedChatType === "private" && selectedUser?._id) {
      getMessages(selectedUser._id);
    }

    if (selectedChatType === "group" && selectedGroup?._id) {
      getGroupMessages(selectedGroup._id);
    }

    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser?._id, selectedGroup?._id, selectedChatType]);

  // =====================
  // AUTO SCROLL
  // =====================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  if (!selectedUser && !selectedGroup) return null;

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // =====================
  // TYPING TEXT
  // =====================
  const typingUserIds = Object.keys(typingUsers).filter((id) => {
    if (id === authUser._id) return false;

    if (selectedChatType === "private") {
      return id === selectedUser?._id;
    }

    if (selectedChatType === "group") {
      return true;
    }

    return false;
  });

  let typingText = null;

  if (typingUserIds.length > 0) {
    if (selectedChatType === "private") {
      typingText = "Typing...";
    } else {
      typingText =
        typingUserIds.length === 1
          ? "Someone is typing..."
          : `${typingUserIds.length} people are typing...`;
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
            <div
              key={message._id}
              ref={isLast ? bottomRef : null}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              {/* Avatar */}
              <div className="chat-image avatar">
                <div className="h-10 w-10 rounded-full border">
                  <img
                    src={sender?.profilePic || "/avatar.png"}
                    alt="avatar"
                  />
                </div>
              </div>

              {/* Header */}
              <div className="chat-header mb-1 flex items-center gap-2">
                {selectedChatType === "group" && !isMe && (
                  <span className="text-sm font-medium">
                    {sender?.fullName}
                  </span>
                )}
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Bubble */}
              <div className="chat-bubble max-w-[75%] flex flex-col gap-2">
                {(message.image || message.audio || message.file?.url) && (
                  <div className="flex flex-col gap-2 rounded-lg bg-base-200/50 p-2">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="image"
                        className="rounded-lg max-w-[220px]"
                      />
                    )}

                    {message.audio && (
                      <AudioMessage audioUrl={message.audio} isMe={isMe} />
                    )}

                    {message.file?.url && (
                      <FileMessage file={message.file} />
                    )}
                  </div>
                )}

                {message.text && (
                  <p className="leading-relaxed break-words">
                    {message.text}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {/* 👇 TYPING INDICATOR */}
        {/* {typingText && (
          <div className="text-sm italic opacity-60 px-2">
            {typingText}
          </div>
        )} */}

        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;