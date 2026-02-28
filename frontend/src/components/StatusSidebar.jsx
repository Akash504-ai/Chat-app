import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useStatusStore } from "../store/useStatusStore";
import { useAuthStore } from "../store/useAuthStore";
import AddStatusModal from "./AddStatusModal";

const StatusSidebar = ({ setActiveTab }) => {
  const { authUser } = useAuthStore();
  const { statuses, getStatuses, viewStatus, isStatusLoading } =
    useStatusStore();

  const [showAddStatus, setShowAddStatus] = useState(false);

  useEffect(() => {
    getStatuses();
  }, [getStatuses]);

  // group statuses by user
  const groupedStatuses = statuses.reduce((acc, status) => {
    if (!status?.user?._id) return acc;
    const userId = status.user._id; 
    if (!acc[userId]) {
      acc[userId] = {
        user: status.user,
        statuses: [],
      };
    }
    acc[userId].statuses.push(status);
    return acc;
  }, {});

  return (
    <>
      <div className="h-full w-full overflow-y-auto">

        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 border-b border-base-300">
          <button
            onClick={() => setActiveTab("chats")}
            className="btn btn-sm btn-ghost"
          >
            <ArrowLeft />
          </button>
          <h2 className="font-semibold text-lg">Status</h2>
        </div>

        {isStatusLoading && (
          <div className="px-4 py-3 text-sm opacity-60">
            Loading statuses...
          </div>
        )}

        {/* MY STATUS */}
        <div
          onClick={() => setShowAddStatus(true)}
          className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-base-200"
        >
          <img
            src={authUser?.profilePic || "/avatar.png"}
            alt="me"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-medium">My status</p>
            <p className="text-xs opacity-60">Tap to add status</p>
          </div>
        </div>

        <div className="divider my-2" />

        {/* OTHER STATUSES */}
        {Object.values(groupedStatuses).map(({ user, statuses }) => (
          <div
            key={user?._id}
            onClick={() => viewStatus(statuses[0])}
            className="px-4 py-3 flex items-center gap-3 cursor-pointer hover:bg-base-200"
          >
            <img
              src={user.profilePic || "/avatar.png"}
              alt={user?.fullName}
              className="w-12 h-12 rounded-full ring-2 ring-primary"
            />

            <div>
              <p className="font-medium">{user?.fullName}</p>
              <p className="text-xs opacity-60">
                {new Date(statuses[0].createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ADD STATUS MODAL */}
      {showAddStatus && (
        <AddStatusModal onClose={() => setShowAddStatus(false)} />
      )}
    </>
  );
};

export default StatusSidebar;