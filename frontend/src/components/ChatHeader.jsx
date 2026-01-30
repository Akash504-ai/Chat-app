import { X, Info, ArrowLeft, MoreVertical, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import GroupMembersModal from "./GroupMembersModal";

const ChatHeader = () => {
  const {
    selectedUser,
    selectedGroup,
    selectedChatType,
    setSelectedUser,
    setSelectedGroup,
    typingUsers,
    clearChatForMe,
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const [showMembers, setShowMembers] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!selectedUser && !selectedGroup) return null;

  const isGroup = selectedChatType === "group";
  const chatId = isGroup ? selectedGroup?._id : selectedUser?._id;

  // TYPING USERS LOGIC
  const typingUserIds = Object.keys(typingUsers).filter((id) => id !== authUser._id);
  let typingText = null;
  if (typingUserIds.length > 0) {
    typingText = !isGroup ? "typing..." : typingUserIds.length === 1 ? "Someone is typing..." : `${typingUserIds.length} people typing...`;
  }

  const handleClearChat = () => {
    if (!chatId) return;
    const ok = window.confirm("Clear chat for you? This action cannot be undone.");
    if (ok) {
      clearChatForMe(chatId);
      setOpenMenu(false);
    }
  };

  const closeChat = () => (isGroup ? setSelectedGroup(null) : setSelectedUser(null));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/80 backdrop-blur-lg">
      <div className="px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex items-center justify-between">
          
          {/* LEFT SECTION: Info & Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button onClick={closeChat} className="btn btn-ghost btn-sm btn-circle lg:hidden">
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="relative">
              {isGroup ? (
                <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="font-bold text-primary text-sm sm:text-base">
                    {selectedGroup.name[0].toUpperCase()}
                  </span>
                </div>
              ) : (
                <>
                  <img
                    src={selectedUser.profilePic || "/avatar.png"}
                    alt="avatar"
                    className="h-9 w-9 sm:h-11 sm:w-11 rounded-full object-cover ring-1 ring-base-content/10"
                  />
                  {onlineUsers.includes(selectedUser._id) && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100 bg-success" />
                  )}
                </>
              )}
            </div>

            <div className="min-w-0">
              <h3 className="font-semibold truncate text-sm sm:text-base leading-tight">
                {isGroup ? selectedGroup.name : selectedUser.fullName}
              </h3>
              <div className="flex items-center gap-1.5 h-4">
                {typingText ? (
                  <span className="text-[11px] sm:text-xs text-primary font-medium animate-pulse">
                    {typingText}
                  </span>
                ) : (
                  <span className="text-[11px] sm:text-xs text-base-content/50">
                    {isGroup ? "Group Chat" : onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SECTION: Actions */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {isGroup && (
              <button onClick={() => setShowMembers(true)} className="btn btn-ghost btn-sm btn-circle" title="Group Info">
                <Info className="h-5 w-5 opacity-70" />
              </button>
            )}

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className={`btn btn-ghost btn-sm btn-circle ${openMenu ? "bg-base-200" : ""}`}
              >
                <MoreVertical className="h-5 w-5 opacity-70" />
              </button>

              <AnimatePresence>
                {openMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-base-100 border border-base-200 rounded-xl shadow-2xl z-50 py-1 overflow-hidden"
                  >
                    <button
                      onClick={handleClearChat}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="font-medium">Clear Chat</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={closeChat} className="btn btn-ghost btn-sm btn-circle hidden lg:flex">
              <X className="h-5 w-5 opacity-70" />
            </button>
          </div>
        </div>
      </div>

      {showMembers && isGroup && (
        <GroupMembersModal groupId={selectedGroup._id} onClose={() => setShowMembers(false)} />
      )}
    </header>
  );
};

export default ChatHeader;