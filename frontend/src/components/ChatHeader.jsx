import { X, Info } from "lucide-react";
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
      <div className="border-b border-base-300 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span
                className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-base-100
                  ${isOnline ? "bg-success" : "bg-base-300"}
                `}
              />
            </div>

            <div className="min-w-0">
              <h3 className="font-medium truncate">
                {selectedUser.fullName}
              </h3>
              <p className="text-xs text-base-content/70">
                {typingText || (isOnline ? "Online" : "Offline")}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedUser(null)}
            className="btn btn-ghost btn-sm"
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
        <div className="border-b border-base-300 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold">
                  {selectedGroup.name[0]}
                </span>
              </div>

              <div className="min-w-0">
                <h3 className="font-medium truncate">
                  {selectedGroup.name}
                </h3>
                <p className="text-xs text-base-content/70">
                  {typingText || "Group chat"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* MEMBERS */}
              <button
                onClick={() => setShowMembers(true)}
                className="btn btn-ghost btn-sm"
              >
                <Info className="h-5 w-5" />
              </button>

              {/* CLOSE */}
              <button
                onClick={() => setSelectedGroup(null)}
                className="btn btn-ghost btn-sm"
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