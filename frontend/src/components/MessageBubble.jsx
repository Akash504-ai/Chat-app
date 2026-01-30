import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Trash,
  Trash2,
  ShieldAlert,
  Copy,
  SmilePlus,
  Pin,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "../store/useChatStore";
import FileMessage from "./FileMessage";
import AudioMessage from "./AudioMessage";
import { formatMessageTime } from "../lib/utils";
import toast from "react-hot-toast";

const REACTIONS = ["👍", "❤️", "😂", "😮", "😢", "🔥"];

const MessageBubble = ({ message, sender, isMe, chatType }) => {
  const [open, setOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const menuRef = useRef(null);
  const emojiRef = useRef(null);

  const {
    deleteMessageForMe,
    deleteMessageForEveryone,
    reactions,
    addReaction,
    pinnedMessages,
    togglePin,
  } = useChatStore();

  const isPinned = pinnedMessages?.[message._id];
  const myReaction = reactions?.[message._id];

  const canDeleteForEveryone =
    isMe && chatType === "private" && !message.deletedForEveryone;

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setShowEmojis(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopyText = async () => {
    if (!message.text) return;
    await navigator.clipboard.writeText(message.text);
    toast.success("Copied to clipboard");
    setOpen(false);
  };

  return (
    <div
      id={`msg-${message._id}`}
      className={`chat ${isMe ? "chat-end" : "chat-start"} w-full group mb-3 px-4 transition-all`}
    >
      {/* Avatar */}
      <div className="chat-image avatar self-end mb-1">
        <div className="h-8 w-8 rounded-full ring-2 ring-base-100 shadow-sm">
          <img
            src={sender?.profilePic || "/avatar.png"}
            alt="avatar"
            className="object-cover"
          />
        </div>
      </div>

      <div
        className={`flex flex-col max-w-[80%] md:max-w-[70%] ${isMe ? "items-end" : "items-start"}`}
      >
        <div className="relative flex items-center gap-2 max-w-full">
          {/* Buttons (me) */}
          {isMe && !message.deletedForEveryone && (
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 order-first">
              {/* Emoji Trigger Icon */}
              <div className="relative" ref={emojiRef}>
                <button
                  onClick={() => setShowEmojis(!showEmojis)}
                  className={`p-1.5 rounded-full hover:bg-base-200 text-base-content/40 ${showEmojis ? "text-primary bg-base-200" : ""}`}
                >
                  <SmilePlus size={16} />
                </button>

                <AnimatePresence>
                  {showEmojis && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 5 }}
                      className="absolute bottom-full mb-2 right-0 flex items-center gap-1 bg-base-100 border border-base-200 rounded-full px-2 py-1 shadow-xl z-[60]"
                    >
                      {REACTIONS.map((emoji, i) => (
                        <motion.button
                          key={emoji}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => {
                            addReaction(message._id, emoji);
                            setShowEmojis(false);
                          }}
                          className="text-lg hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Settings Trigger */}
              <button
                onClick={() => setOpen(!open)}
                className={`p-1.5 rounded-full hover:bg-base-200 text-base-content/40 ${open ? "bg-base-200" : ""}`}
              >
                <MoreVertical size={16} />
              </button>
            </div>
          )}

          {/* Pin Visual Indicator */}
          {isPinned && (
            <Pin
              size={14}
              className={`absolute -top-2 ${isMe ? "-left-2" : "-right-2"} rotate-45 text-warning z-10`}
            />
          )}

          {/* Bubble */}
          <div
            className={`relative chat-bubble px-4 py-2.5 shadow-sm transition-colors ${
              message.deletedForEveryone
                ? "bg-base-200/50 border border-base-300 text-base-content/40 italic"
                : isMe
                  ? "bg-primary text-primary-content rounded-2xl rounded-tr-none"
                  : "bg-base-100 border border-base-200 text-base-content rounded-2xl rounded-tl-none"
            }`}
          >
            {message.deletedForEveryone ? (
              <div className="flex items-center gap-2 text-xs">
                <ShieldAlert size={12} />
                <span>This message was deleted</span>
              </div>
            ) : (
              <>
                {(message.image || message.audio || message.file?.url) && (
                  <div className="flex flex-col gap-2 mb-2">
                    {message.image && (
                      <motion.img
                        layoutId={message._id}
                        src={message.image}
                        className="rounded-lg max-w-full"
                        alt="attachment"
                      />
                    )}
                    {message.audio && (
                      <AudioMessage audioUrl={message.audio} isMe={isMe} />
                    )}
                    {message.file?.url && <FileMessage file={message.file} />}
                  </div>
                )}

                {message.text && (
                  <p className="text-[14.5px] leading-relaxed whitespace-pre-wrap break-words">
                    {message.text}
                  </p>
                )}
              </>
            )}

            {/* SELECTED REACTION DISPLAY */}
            {myReaction && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -bottom-2 ${isMe ? "left-0" : "right-0"} inline-flex items-center justify-center rounded-full bg-base-100 border border-base-200 px-1.5 py-0.5 shadow-sm`}
              >
                <span className="text-sm">{myReaction}</span>
              </motion.div>
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
              {open && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`absolute bottom-full mb-2 z-[100] ${
                    isMe ? "right-0" : "left-0"
                  } bg-base-100 border border-base-200 rounded-xl shadow-2xl w-44 overflow-hidden py-1`}
                >
                  {/* Pin/Unpin Option Inside Menu */}
                  {!message.deletedForEveryone && (
                    <button
                      onClick={() => {
                        togglePin(message._id);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200"
                    >
                      <Pin
                        size={14}
                        className={isPinned ? "text-warning" : ""}
                      />
                      {isPinned ? "Unpin message" : "Pin message"}
                    </button>
                  )}

                  {message.text && (
                    <button
                      onClick={handleCopyText}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200"
                    >
                      <Copy size={14} />
                      Copy text
                    </button>
                  )}

                  <button
                    onClick={() => {
                      deleteMessageForMe(message._id);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-base-200 border-t border-base-200"
                  >
                    <Trash size={14} />
                    Delete for me
                  </button>

                  {canDeleteForEveryone && (
                    <button
                      onClick={() => {
                        deleteMessageForEveryone(message._id);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 border-t border-base-200"
                    >
                      <Trash2 size={14} />
                      Delete for all
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Buttons (other) */}
          {!isMe && !message.deletedForEveryone && (
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <div className="relative" ref={emojiRef}>
                <button
                  onClick={() => setShowEmojis(!showEmojis)}
                  className={`p-1.5 rounded-full hover:bg-base-200 text-base-content/40 ${showEmojis ? "text-primary bg-base-200" : ""}`}
                >
                  <SmilePlus size={16} />
                </button>
                <AnimatePresence>
                  {showEmojis && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 5 }}
                      className="absolute bottom-full mb-2 left-0 flex items-center gap-1 bg-base-100 border border-base-200 rounded-full px-2 py-1 shadow-xl z-[60]"
                    >
                      {REACTIONS.map((emoji, i) => (
                        <motion.button
                          key={emoji}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.04 }}
                          onClick={() => {
                            addReaction(message._id, emoji);
                            setShowEmojis(false);
                          }}
                          className="text-lg hover:scale-125 transition-transform"
                        >
                          {emoji}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setOpen(!open)}
                className={`p-1.5 rounded-full hover:bg-base-200 text-base-content/40 ${open ? "bg-base-200" : ""}`}
              >
                <MoreVertical size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className={`mt-1.5 flex items-center gap-1.5 text-[10px] opacity-60 ${isMe ? "mr-1" : "ml-1"}`}
        >
          <span>{formatMessageTime(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
