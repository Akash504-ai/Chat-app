import { X, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";

const AddMemberModal = ({ group, onClose, onAdded }) => {
  const { users, getUsers, addGroupMember } = useChatStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      await getUsers();
      setLoading(false);
    };
    loadUsers();
  }, [getUsers]);

  if (loading) return null;

  // users NOT already in group
  const memberIds = group.members.map((m) => m.userId._id);
  const availableUsers = users.filter((u) => !memberIds.includes(u._id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-base-100 shadow-lg">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold">Add members</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* USERS LIST */}
        <div className="max-h-[60vh] overflow-y-auto">
          {availableUsers.length === 0 && (
            <p className="p-4 text-center text-sm opacity-60">
              No users available
            </p>
          )}

          {availableUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-3 hover:bg-base-200"
            >
              <img
                src={user.profilePic || "/avatar.png"}
                className="h-10 w-10 rounded-full"
              />

              <p className="flex-1 font-medium">{user.fullName}</p>

              <button
                onClick={async () => {
                  await addGroupMember(group._id, user._id);

                  onAdded({
                    ...group,
                    members: [
                      ...group.members,
                      {
                        userId: user, 
                        role: "member",
                      },
                    ],
                  });

                  onClose();
                }}
                className="btn btn-sm btn-primary"
              >
                <UserPlus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
