import { X, Crown, UserMinus, LogOut, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import AddMemberModal from "./AddMemberModal";

const GroupMembersModal = ({ groupId, onClose }) => {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);

  const { authUser } = useAuthStore();
  const { leaveGroup, removeGroupMember } = useChatStore();

  // =====================
  // FETCH GROUP
  // =====================
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axiosInstance.get(`/groups/${groupId}`);
        setGroup(res.data);
      } catch {
        alert("Failed to load group info");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  if (loading || !group) return null;

  // =====================
  // ROLE CHECK
  // =====================
  const myRole = group.members.find(
    (m) => m.userId._id === authUser._id
  )?.role;

  const isAdmin = myRole === "admin";
  const isCreator = group.createdBy === authUser._id;

  // =====================
  // HANDLERS
  // =====================
  const handleRemove = async (userId) => {
    if (!confirm("Remove this member?")) return;

    await removeGroupMember(group._id, userId);

    setGroup((prev) => ({
      ...prev,
      members: prev.members.filter(
        (m) => m.userId._id !== userId
      ),
    }));
  };

  const handleLeave = async () => {
    if (!confirm("Leave this group?")) return;
    await leaveGroup(group._id);
    onClose();
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-base-100 shadow-lg">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">
            {group.name} · {group.members.length}
          </h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* ADMIN ACTIONS */}
        {isAdmin && (
          <div className="border-b p-3">
            <button
              onClick={() => setShowAddMember(true)}
              className="btn btn-sm btn-primary w-full"
            >
              <Plus size={16} /> Add member
            </button>
          </div>
        )}

        {/* MEMBERS LIST */}
        <div className="max-h-[60vh] overflow-y-auto">
          {group.members.map((m) => {
            const isMe = m.userId._id === authUser._id;

            return (
              <div
                key={m.userId._id}
                className="flex items-center gap-3 p-3 hover:bg-base-200"
              >
                <img
                  src={m.userId.profilePic || "/avatar.png"}
                  className="h-10 w-10 rounded-full"
                />

                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {m.userId.fullName}
                    {isMe && " (You)"}
                  </p>
                  <p className="text-xs opacity-60">
                    {m.role}
                  </p>
                </div>

                {m.role === "admin" && (
                  <Crown className="text-warning" size={18} />
                )}

                {/* REMOVE MEMBER (ADMIN ONLY) */}
                {isAdmin && !isMe && (
                  <button
                    onClick={() => handleRemove(m.userId._id)}
                    className="btn btn-ghost btn-xs text-error"
                  >
                    <UserMinus size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* LEAVE GROUP */}
        {!isCreator && (
          <div className="border-t p-3">
            <button
              onClick={handleLeave}
              className="btn btn-error btn-sm w-full"
            >
              <LogOut size={16} /> Leave group
            </button>
          </div>
        )}
      </div>

      {/* ADD MEMBER MODAL */}
      {showAddMember && (
        <AddMemberModal
          group={group}
          onClose={() => setShowAddMember(false)}
          onAdded={(updatedGroup) => setGroup(updatedGroup)}
        />
      )}
    </div>
  );
};

export default GroupMembersModal;