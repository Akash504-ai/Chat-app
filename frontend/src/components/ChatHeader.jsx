import { X, Info, ArrowLeft } from "lucide-react";
import { useState } from "react";
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
  } = useChatStore();

  const { authUser, onlineUsers } = useAuthStore();
  const [showMembers, setShowMembers] = useState(false);

  if (!selectedUser && !selectedGroup) return null;

  const isGroup = selectedChatType === "group";

  // =====================
  // TYPING USERS
  // =====================
  const typingUserIds = Object.keys(typingUsers).filter(
    (id) => id !== authUser._id
  );

  let typingText = null;

  if (typingUserIds.length > 0) {
    if (!isGroup) {
      typingText = "typing...";
    } else {
      typingText =
        typingUserIds.length === 1
          ? "Someone is typing..."
          : `${typingUserIds.length} people typing...`;
    }
  }

  // =====================
  // PRIVATE CHAT HEADER
  // =====================
  if (!isGroup && selectedUser) {
    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
      <div className="border-b border-base-300 px-2 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between gap-2">
          {/* LEFT */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* BACK (mobile only) */}
            <button
              onClick={() => setSelectedUser(null)}
              className="btn btn-ghost btn-sm lg:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border-2 border-base-100
                  ${isOnline ? "bg-success" : "bg-base-300"}
                `}
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-medium truncate text-sm sm:text-base">
                {selectedUser.fullName}
              </h3>
              <p className="text-xs text-base-content/70">
                {typingText || (isOnline ? "Online" : "Offline")}
              </p>
            </div>
          </div>

          {/* CLOSE (desktop) */}
          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm hidden lg:inline-flex"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  // =====================
  // GROUP CHAT HEADER
  // =====================
  if (isGroup && selectedGroup) {
    return (
      <>
        <div className="border-b border-base-300 px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-2">
            {/* LEFT */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {/* BACK (mobile only) */}
              <button
                onClick={() => setSelectedGroup(null)}
                className="btn btn-ghost btn-sm lg:hidden"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-sm sm:text-base">
                  {selectedGroup.name[0]}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="font-medium truncate text-sm sm:text-base">
                  {selectedGroup.name}
                </h3>
                <p className="text-xs text-base-content/70">
                  {typingText || "Group chat"}
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowMembers(true)}
                className="btn btn-ghost btn-sm"
              >
                <Info className="h-5 w-5" />
              </button>

              <button
                onClick={() => setSelectedGroup(null)}
                className="btn btn-ghost btn-sm hidden lg:inline-flex"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {showMembers && (
          <GroupMembersModal
            groupId={selectedGroup._id}
            onClose={() => setShowMembers(false)}
          />
        )}
      </>
    );
  }

  return null;
};

export default ChatHeader;