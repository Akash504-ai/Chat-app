import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

const ChangeGroupInfoModal = ({ group, onClose, onUpdateGroup }) => {
  const [name, setName] = useState(group.name);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Group name is required");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.patch(
        `/groups/${group._id}/update`,
        { name }
      );
      onUpdateGroup(res.data);
      toast.success("Group updated");
      onClose();
    } catch {
      toast.error("Failed to update group");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-base-100 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Edit Group</h2>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            ✕
          </button>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Group Name</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="btn btn-sm btn-ghost"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSave}
            className="btn btn-sm btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeGroupInfoModal;