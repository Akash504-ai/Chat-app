import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";

import GroupMembersList from "../components/GroupMembersList";
import AddMemberModal from "../components/AddMemberModal";
import ChangeGroupInfoModal from "../components/ChangeGroupInfoModal";

const GroupInfoPage = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthStore();

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showEditGroup, setShowEditGroup] = useState(false);

  const isAdmin = group?.admins?.includes(authUser._id);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axiosInstance.get(`/groups/${groupId}`);
        setGroup(res.data);
      } catch (error) {
        toast.error("Failed to load group");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [groupId]);

  const handleLeaveGroup = async () => {
    try {
      await axiosInstance.post(`/groups/${groupId}/leave`);
      toast.success("You left the group");
      navigate("/");
    } catch {
      toast.error("Failed to leave group");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!group) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Group Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{group.name}</h1>
          <p className="text-sm opacity-60">
            {group.members.length} members
          </p>
        </div>

        {isAdmin && (
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setShowEditGroup(true)}
          >
            Edit
          </button>
        )}
      </div>

      {/* Members */}
      <GroupMembersList
        group={group}
        isAdmin={isAdmin}
        onUpdateGroup={setGroup}
      />

      {/* Actions */}
      <div className="flex gap-3">
        {isAdmin && (
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddMember(true)}
          >
            Add Members
          </button>
        )}

        <button
          className="btn btn-error btn-sm btn-outline"
          onClick={handleLeaveGroup}
        >
          Leave Group
        </button>
      </div>

      {/* Modals */}
      {showAddMember && (
        <AddMemberModal
          group={group}
          onClose={() => setShowAddMember(false)}
          onUpdateGroup={setGroup}
        />
      )}

      {showEditGroup && (
        <ChangeGroupInfoModal
          group={group}
          onClose={() => setShowEditGroup(false)}
          onUpdateGroup={setGroup}
        />
      )}
    </div>
  );
};

export default GroupInfoPage;