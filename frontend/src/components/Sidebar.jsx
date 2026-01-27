import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="flex h-full w-20 flex-col border-r border-base-300 transition-all duration-200 lg:w-72">
      {/* Header */}
      <div className="border-b border-base-300 p-5">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          <span className="hidden font-medium lg:block">Contacts</span>
        </div>

        {/* Online filter */}
        <div className="mt-3 hidden items-center gap-2 lg:flex">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
            />
            <span className="text-sm">Online only</span>
          </label>
          <span className="text-xs text-base-content/60">
            ({onlineUsers.length} online)
          </span>
        </div>
      </div>

      {/* Users */}
      <div className="w-full flex-1 overflow-y-auto py-2">
        {filteredUsers.map((user) => {
          const isSelected = selectedUser?._id === user._id;
          const isOnline = onlineUsers.includes(user._id);

          return (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex w-full items-center gap-3 p-3 text-left transition
                hover:bg-base-200
                ${isSelected ? "bg-base-200" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.fullName}
                  className="h-12 w-12 rounded-full object-cover"
                />
                {isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-base-100" />
                )}
              </div>

              <div className="hidden min-w-0 lg:block">
                <p className="truncate font-medium">{user.fullName}</p>
                <p className="text-xs text-base-content/60">
                  {isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </button>
          );
        })}

        {filteredUsers.length === 0 && (
          <div className="py-6 text-center text-sm text-base-content/60">
            No users found
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;