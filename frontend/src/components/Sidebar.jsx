import { useEffect, useState } from "react";
import { Users, Plus, UsersRound, Trash2 } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import CreateGroupModal from "./CreateGroupModal";

const Sidebar = () => {
  const {
    getUsers,
    getGroups,
    users,
    groups,
    selectedUser,
    selectedGroup,
    selectedChatType,
    typingUsers,
    unreadCounts,
    setSelectedUser,
    setSelectedGroup,
    clearSelectedChat,
    deleteGroup,
    isUsersLoading,
    isGroupsLoading,
  } = useChatStore();

  const { onlineUsers, authUser } = useAuthStore();

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  useEffect(() => {
    getUsers();
    getGroups();
  }, []);

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUsers.includes(u._id))
    : users;

  const handleDeleteGroup = (e, groupId) => {
    e.stopPropagation();
    if (!confirm("Delete this group?")) return;
    deleteGroup(groupId);
  };

  if (isUsersLoading || isGroupsLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <>
      <aside
        className="
          flex h-full min-h-0 flex-col
          border-r border-base-300 bg-base-100
          w-full md:w-20 lg:w-72
        "
      >
        {/* HEADER */}
        <div className="border-b border-base-300 p-3 sm:p-4 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Users className="h-6 w-6 shrink-0" />
              <span className="font-medium truncate md:hidden lg:block">
                Chats
              </span>
            </div>

            <button
              onClick={() => setShowCreateGroup(true)}
              className="btn btn-sm btn-ghost shrink-0"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          {/* Online filter — desktop only */}
          <div className="mt-3 hidden lg:flex items-center gap-2">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
              />
              <span className="text-sm">Online only</span>
            </label>
            <span className="text-xs opacity-60">
              ({onlineUsers.length} online)
            </span>
          </div>
        </div>

        {/* GROUPS */}
        {groups.length > 0 && (
          <div className="border-b border-base-300 py-2 shrink-0">
            <p className="px-4 text-xs font-semibold opacity-60">GROUPS</p>

            {groups.map((group) => {
              const isActive = selectedGroup?._id === group._id;
              const isCreator = group.createdBy === authUser._id;

              const isTyping =
                selectedChatType === "group" &&
                selectedGroup?._id === group._id &&
                Object.keys(typingUsers).length > 0;

              return (
                <button
                  key={group._id}
                  onClick={() => {
                    clearSelectedChat();
                    setSelectedGroup(group);
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 hover:bg-base-200 ${
                    isActive ? "bg-base-200" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <UsersRound className="h-10 w-10 rounded-full bg-primary/10 p-2 shrink-0" />

                    {/* MOBILE + DESKTOP TEXT */}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{group.name}</p>
                      <p className="text-xs opacity-60">
                        {isTyping ? "Someone typing..." : "Group chat"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {unreadCounts[group._id] > 0 && (
                      <span className="badge badge-error text-xs">
                        {unreadCounts[group._id] > 9
                          ? "9+"
                          : unreadCounts[group._id]}
                      </span>
                    )}

                    {isCreator && (
                      <button
                        onClick={(e) => handleDeleteGroup(e, group._id)}
                        className="btn btn-ghost btn-xs text-error"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* USERS */}
        <div className="flex-1 min-h-0 overflow-y-auto py-2">
          <p className="px-4 text-xs font-semibold opacity-60">USERS</p>

          {filteredUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);
            const isAI = user.isAI;

            const isTyping =
              selectedChatType === "private" &&
              selectedUser?._id === user._id &&
              Object.keys(typingUsers).includes(user._id);

            return (
              <button
                key={user._id}
                onClick={() => {
                  clearSelectedChat();
                  setSelectedUser(user);
                }}
                className={`flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-base-200 ${
                  isSelected ? "bg-base-200" : ""
                }`}
              >
                <div className="relative shrink-0">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.fullName}
                    className="h-12 w-12 rounded-full"
                  />
                  {!isAI && isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-base-100" />
                  )}
                </div>

                {/* NAME — VISIBLE ON MOBILE + DESKTOP */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {isAI ? "AI Assistant" : user.fullName}
                  </p>
                  <p className="text-xs opacity-60">
                    {isAI
                      ? "AI Assistant"
                      : isTyping
                        ? "typing..."
                        : isOnline
                          ? "Online"
                          : user.lastSeen
                            ? `Last seen ${new Date(
                                user.lastSeen,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}`
                            : "Offline"}
                  </p>
                </div>

                {!isAI && unreadCounts[user._id] > 0 && (
                  <span className="badge badge-error text-xs shrink-0">
                    {unreadCounts[user._id] > 9 ? "9+" : unreadCounts[user._id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}
    </>
  );
};

export default Sidebar;
