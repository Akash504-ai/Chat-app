import { useEffect, useMemo, useState } from "react";
import { X, Trash2, Eye, Send } from "lucide-react";
import { useStatusStore } from "../store/useStatusStore";
import StatusProgress from "./StatusProgress";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const StatusViewer = () => {
  const {
    statuses,
    selectedStatus,
    clearSelectedStatus,
    viewStatus,
    deleteStatus,
  } = useStatusStore();

  const [replyText, setReplyText] = useState("");
const { createOrGetChat, sendMessage } = useChatStore();
const navigate = useNavigate();


  const [showViewers, setShowViewers] = useState(false);

  const { authUser } = useAuthStore();

  const userStatuses = useMemo(() => {
    if (!selectedStatus) return [];
    return statuses.filter((s) => s.user._id === selectedStatus.user._id);
  }, [statuses, selectedStatus]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!selectedStatus) return;

    const index = userStatuses.findIndex((s) => s._id === selectedStatus._id);

    setCurrentIndex(index === -1 ? 0 : index);
    viewStatus(selectedStatus);
  }, [selectedStatus, userStatuses, viewStatus]);

  if (!selectedStatus) return null;

  const status = userStatuses[currentIndex];

  const nextStatus = () => {
    if (currentIndex < userStatuses.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      clearSelectedStatus(); // exit viewer
    }
  };

  const prevStatus = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  const handleSendReply = async () => {
  if (!replyText.trim()) return;

  const chat = await createOrGetChat(status.user._id);

  await sendMessage(chat._id, {
    text: replyText,
    statusReply: {
      statusId: status._id,
      mediaUrl: status.mediaUrl,
      text: status.text,
    },
  });

  setReplyText("");
  clearSelectedStatus();
  navigate("/chats");
};


  const isImage = status.mediaUrl?.match(/\.(jpg|jpeg|png|webp)$/i);
  const isVideo = status.mediaUrl?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* PROGRESS */}
      <div className="flex gap-1 px-2 pt-2">
        {userStatuses.map((_, i) => {
          if (i < currentIndex) {
            // completed
            return <div key={i} className="flex-1 h-1 bg-white rounded" />;
          }

          if (i === currentIndex) {
            // active
            return (
              <div key={i} className="flex-1">
                <StatusProgress duration={5000} onComplete={nextStatus} />
              </div>
            );
          }

          // upcoming
          return <div key={i} className="flex-1 h-1 bg-white/30 rounded" />;
        })}
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between p-4 text-white z-20 relative">
        {/* LEFT : USER INFO */}
        <div className="flex items-center gap-3">
          <img
            src={status.user.profilePic || "/avatar.png"}
            className="w-10 h-10 rounded-full"
            alt={status.user.fullName}
          />
          <div>
            <p className="font-medium">{status.user.fullName}</p>
            <p className="text-xs opacity-70">
              {new Date(status.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* RIGHT : ACTIONS */}
        <div className="flex items-center gap-3">
          {/* VIEWERS (only for own status) */}
          {status.user._id === authUser._id && (
            <button
              onClick={() => setShowViewers(true)}
              className="opacity-80 hover:opacity-100"
              title="Viewers"
            >
              <Eye size={20} />
            </button>
          )}

          {/* DELETE (only for own status) */}
          {status.user._id === authUser._id && (
            <button
              onClick={() => deleteStatus(status._id)}
              className="opacity-80 hover:opacity-100"
              title="Delete status"
            >
              <Trash2 size={20} />
            </button>
          )}

          {/* CLOSE */}
          <button
            onClick={clearSelectedStatus}
            className="opacity-80 hover:opacity-100"
            title="Close"
          >
            <X />
          </button>
        </div>
      </div>

      {/* CLICK ZONES */}
      <div className="absolute inset-x-0 top-20 bottom-0 flex z-10">
        <div className="w-1/2" onClick={prevStatus} />
        <div className="w-1/2" onClick={nextStatus} />
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center z-0">
        {isImage && (
          <img
            src={status.mediaUrl}
            className="max-h-full max-w-full object-contain"
          />
        )}

        {isVideo && (
          <video
            src={status.mediaUrl}
            autoPlay
            className="max-h-full max-w-full"
          />
        )}

        {!status.mediaUrl && (
          <div className="text-white text-xl px-6 text-center">
            {status.text}
          </div>
        )}
      </div>
      {showViewers && (
        <div className="absolute inset-0 bg-black/60 z-30 flex items-end">
          <div className="w-full bg-base-100 rounded-t-xl p-4 max-h-[60%] overflow-y-auto">
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium">Viewed by {status.viewers.length}</p>
              <button onClick={() => setShowViewers(false)}>
                <X />
              </button>
            </div>

            {status.viewers.length === 0 && (
              <p className="text-sm opacity-60">No views yet</p>
            )}

            {status.viewers.map((viewer) => (
              <div key={viewer._id} className="flex items-center gap-3 py-2">
                <img
                  src={viewer.profilePic || "/avatar.png"}
                  className="w-9 h-9 rounded-full"
                />
                <p className="font-medium">{viewer.fullName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusViewer;
