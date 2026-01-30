import {
  X,
  Info,
  ArrowLeft,
  MoreVertical,
  Trash2,
  Sparkles,
  Phone,
  Video,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import GroupMembersModal from "./GroupMembersModal";
import { useCallStore } from "../store/useCallStore";

const ChatHeader = () => {
  const {
    selectedUser,
    selectedGroup,
    selectedChatType,
    setSelectedUser,
    setSelectedGroup,
    typingUsers,
    clearChatForMe,
    isAILoading, // Added to track AI state
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const [showMembers, setShowMembers] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const { startCall, startGroupCall } = useCallStore();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!selectedUser && !selectedGroup) return null;

  const isGroup = selectedChatType === "group";
  const isAI = !isGroup && selectedUser?.isAI;
  const chatId = isGroup ? selectedGroup?._id : selectedUser?._id;

  const typingUserIds = Object.keys(typingUsers).filter(
    (id) => id !== authUser._id,
  );

  let typingText = null;
  if (typingUserIds.length > 0 && !isAI) {
    typingText = !isGroup
      ? "typing..."
      : typingUserIds.length === 1
        ? "Someone is typing..."
        : `${typingUserIds.length} people typing...`;
  }

  const handleClearChat = () => {
    if (!chatId) return;
    const ok = window.confirm(
      "Clear chat for you? This action cannot be undone.",
    );
    if (ok) {
      clearChatForMe(chatId);
      setOpenMenu(false);
    }
  };

  const closeChat = () => {
    if (isGroup) setSelectedGroup(null);
    else setSelectedUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-base-300 bg-base-100/90 backdrop-blur-md">
      <div className="px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex items-center justify-between">
          {/* LEFT SECTION: Back Button + Avatar + Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={closeChat}
              className="btn btn-ghost btn-sm btn-circle lg:hidden flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="relative flex-shrink-0">
              {isGroup ? (
                <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                  <span className="font-bold text-primary text-base sm:text-lg">
                    {selectedGroup.name[0].toUpperCase()}
                  </span>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={selectedUser?.profilePic || "/avatar.png"}
                    alt="avatar"
                    className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-base-200
      ${isAI ? "border-2 border-primary/30 animate-pulse" : ""}
    `}
                    onError={(e) => {
                      e.currentTarget.src = "/avatar.png";
                    }}
                  />

                  {!isAI && onlineUsers.includes(selectedUser?._id) && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-base-100 bg-success shadow-sm" />
                  )}
                  {/* AI Pulse effect when loading */}
                  {isAI && isAILoading && (
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                  )}
                </div>
              )}
            </div>

            <div className="min-w-0 flex flex-col">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold truncate text-[15px] sm:text-base tracking-tight">
                  {isGroup
                    ? selectedGroup.name
                    : isAI
                      ? "AI Assistant"
                      : selectedUser.fullName}
                </h3>
                {isAI && (
                  <Sparkles
                    size={14}
                    className={`text-primary fill-primary/20 ${isAILoading ? "animate-pulse" : ""}`}
                  />
                )}
              </div>

              {/* Status/Typing Indicator - Fixed height to prevent jitter */}
              <div className="h-4 flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {isAI && isAILoading ? (
                    <motion.span
                      key="ai-thinking"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-[11px] sm:text-xs text-primary font-bold animate-pulse"
                    >
                      AI is thinking...
                    </motion.span>
                  ) : typingText ? (
                    <motion.span
                      key="typing"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      className="text-[11px] sm:text-xs text-primary font-semibold italic"
                    >
                      {typingText}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="status"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[11px] sm:text-xs text-base-content/50 font-medium"
                    >
                      {isGroup
                        ? `${selectedGroup.members?.length || 0} members`
                        : isAI
                          ? "Always Active"
                          : onlineUsers.includes(selectedUser?._id)
                            ? "Active now"
                            : "Offline"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Actions */}
          <div className="flex items-center gap-1">
            {isGroup && (
              <>
                {/* Group Info */}
                <button
                  onClick={() => setShowMembers(true)}
                  className="btn btn-ghost btn-sm btn-circle hover:bg-base-200"
                  title="Group Info"
                >
                  <Info className="h-5 w-5 text-base-content/60" />
                </button>

                {/* Group Voice Call */}
                <button
                  onClick={() =>
                    startGroupCall({
                      groupId: selectedGroup._id,
                      callType: "voice",
                    })
                  }
                  className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary"
                  title="Group voice call"
                >
                  <Phone className="h-5 w-5" />
                </button>

                {/* Group Video Call */}
                <button
                  onClick={() =>
                    startGroupCall({
                      groupId: selectedGroup._id,
                      callType: "video",
                    })
                  }
                  className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary"
                  title="Group video call"
                >
                  <Video className="h-5 w-5" />
                </button>
              </>
            )}

            {!isGroup && !isAI && (
              <>
                {/* Voice Call */}
                <button
                  onClick={() =>
                    startCall({ receiver: selectedUser, callType: "voice" })
                  }
                  className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary"
                  title="Voice call"
                >
                  <Phone className="h-5 w-5" />
                </button>

                {/* Video Call */}
                <button
                  onClick={() =>
                    startCall({ receiver: selectedUser, callType: "video" })
                  }
                  className="btn btn-ghost btn-sm btn-circle text-base-content/60 hover:text-primary"
                  title="Video call"
                >
                  <Video className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className={`btn btn-ghost btn-sm btn-circle transition-all ${
                  openMenu ? "bg-base-300 text-primary" : "text-base-content/60"
                }`}
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {openMenu && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.95,
                      transformOrigin: "top right",
                    }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-base-100 border border-base-300 rounded-2xl shadow-xl z-[60] py-1.5 overflow-hidden"
                  >
                    <div className="px-4 py-2 text-[10px] uppercase font-bold tracking-widest text-base-content/40">
                      Chat Settings
                    </div>
                    <button
                      onClick={handleClearChat}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error/10 transition-colors group"
                    >
                      <Trash2
                        size={16}
                        className="group-hover:scale-110 transition-transform"
                      />
                      <span className="font-semibold">Clear Conversation</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden lg:block h-6 w-[1px] bg-base-300 mx-1" />

            <button
              onClick={closeChat}
              className="btn btn-ghost btn-sm btn-circle hidden lg:flex text-base-content/60"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showMembers && isGroup && (
        <GroupMembersModal
          groupId={selectedGroup._id}
          onClose={() => setShowMembers(false)}
        />
      )}
    </header>
  );
};

export default ChatHeader;
