import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

const GroupMembersList = ({ group, isAdmin, onUpdateGroup }) => {
  const { authUser } = useAuthStore();

  const handleRemoveUser = async (userId) => {
    try {
      const res = await axiosInstance.post(`/groups/${group._id}/remove-user`, {
        userId,
      });
      onUpdateGroup(res.data);
      toast.success("User removed");
    } catch {
      toast.error("Failed to remove user");
    }
  };

  return (
    <div className="rounded-xl border p-4 space-y-4">
      <h2 className="text-lg font-semibold">Members</h2>

      <ul className="space-y-3">
        {group.members.map((member) => {
          const isMemberAdmin = member.role === "admin";
          const isSelf = member.userId._id === authUser._id;

          return (
            <li
              key={member.userId._id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.userId.profilePic || "/avatar.png"}
                  alt="avatar"
                  className="h-9 w-9 rounded-full border"
                />

                <div>
                  <p className="font-medium">{member.userId.fullName}</p>
                  {isMemberAdmin && (
                    <span className="text-xs text-primary">Admin</span>
                  )}
                </div>
              </div>

              {isAdmin && !isMemberAdmin && !isSelf && (
                <button
                  onClick={() => handleRemoveUser(member.userId._id)}
                  className="btn btn-xs btn-error btn-outline"
                >
                  Remove
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GroupMembersList;
