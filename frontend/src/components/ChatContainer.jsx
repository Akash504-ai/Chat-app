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

      {/* MESSAGES (ONLY SCROLL AREA) */}
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
            <div
              key={message._id}
              ref={isLast ? bottomRef : null}
              className={`chat ${
                isMe ? "chat-end" : "chat-start"
              } w-full min-w-0`}
            >
              <div className="chat-image avatar">
                <div className="h-7 w-7 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full border">
                  <img
                    src={sender?.profilePic || "/avatar.png"}
                    alt="avatar"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="chat-header mb-1 flex items-center gap-1 sm:gap-2 min-w-0">
                {selectedChatType === "group" && !isMe && (
                  <span className="text-xs sm:text-sm font-medium truncate">
                    {sender?.fullName}
                  </span>
                )}
                <time className="text-[10px] sm:text-xs opacity-50 whitespace-nowrap">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              <div className="chat-bubble w-fit max-w-[92%] sm:max-w-[80%] lg:max-w-[65%] flex flex-col gap-2">
                {(message.image || message.audio || message.file?.url) && (
                  <div className="flex flex-col gap-2 rounded-lg bg-base-200/50 p-2">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="image"
                        className="rounded-lg max-w-full sm:max-w-[260px]"
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
                  <p className="text-sm sm:text-base leading-relaxed break-words">
                    {message.text}
                  </p>
                )}

                {isMe && selectedChatType === "private" && (
                  <div className="flex justify-end text-[10px] sm:text-xs opacity-60 mt-1">
                    {message.status === "sent" && "✓"}
                    {message.status === "delivered" && "✓✓"}
                    {message.status === "seen" && (
                      <span className="text-blue-500">✓✓</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT (FIXED) */}
      <div className="shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
