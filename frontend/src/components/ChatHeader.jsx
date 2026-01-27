import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="border-b border-base-300 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
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

          {/* User info */}
          <div className="min-w-0">
            <h3 className="font-medium truncate">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs text-base-content/70">
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;