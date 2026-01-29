import { useState } from "react";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatStore } from "../store/useChatStore";
import { axiosInstance } from "../lib/axios";

const CreateGroupModal = ({ onClose }) => {
  const { users, setSelectedGroup, getGroups } = useChatStore();

  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const createGroup = async () => {
    if (!groupName.trim()) {
      toast.error("Group name required");
      return;
    }

    if (selectedUsers.length < 1) {
      toast.error("Select at least 1 member");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axiosInstance.post("/groups/create", {
        name: groupName,
        members: selectedUsers,
      });

      toast.success("Group created");

      await getGroups();              // ✅ refresh sidebar
      setSelectedGroup(res.data);     // ✅ auto-open group
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create group");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-base-100 p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create Group</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="input input-bordered mb-4 w-full"
        />

        <div className="mb-4 max-h-60 space-y-2 overflow-y-auto">
          {users.map((user) => (
            <label
              key={user._id}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-base-200"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={selectedUsers.includes(user._id)}
                onChange={() => toggleUser(user._id)}
              />
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="h-8 w-8 rounded-full"
              />
              <span className="truncate">{user.fullName}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={createGroup}
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;