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
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser?._id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedUser) return null;

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => {
          const isMe = message.senderId === authUser._id;
          const isLast = idx === messages.length - 1;

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
                    src={
                      isMe
                        ? authUser.profilePic || "/avatar.png"
                        : selectedUser.profilePic || "/avatar.png"
                    }
                    alt="avatar"
                  />
                </div>
              </div>

              {/* Time */}
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Bubble */}
              <div className="chat-bubble flex flex-col gap-2 max-w-[75%]">
                {/* IMAGE */}
                {message.image && (
                  <img
                    src={message.image}
                    alt="image"
                    className="rounded-lg max-w-[220px]"
                  />
                )}

                {/* AUDIO */}
                {message.audio && (
                  <AudioMessage
                    audioUrl={message.audio}
                    isMe={isMe}
                  />
                )}

                {/* FILE */}
                {message.file?.url && (
                  <FileMessage file={message.file} />
                )}

                {/* TEXT */}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;