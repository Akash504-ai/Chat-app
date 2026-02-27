import { Phone, PhoneOff, Video } from "lucide-react";
import { useCallStore } from "../../store/useCallStore";

const IncomingCallModal = () => {
  const { callStatus, callType, caller, acceptCall, rejectCall } =
    useCallStore();

  if (callStatus !== "incoming") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-80 rounded-2xl bg-base-100 p-6 shadow-2xl text-center">

        {/* Profile Picture */}
        <div className="flex justify-center mb-4">
          {caller?.profilePic ? (
            <img
              src={caller.profilePic}
              alt={caller?.fullName || caller?.name}
              className="h-20 w-20 rounded-full object-cover border"
            />
          ) : (
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold">
              {(caller?.fullName || caller?.name || "U")[0]}
            </div>
          )}
        </div>

        {/* Caller Name */}
        <h2 className="text-xl font-semibold">
          {caller?.fullName || caller?.name || "Someone"}
        </h2>

        {/* Call Type */}
        <p className="text-sm text-base-content/60 mt-1">
          {callType === "video" ? "Incoming Video Call" : "Incoming Voice Call"}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-6">
          <button
            onClick={rejectCall}
            className="btn btn-circle btn-error"
            title="Reject"
          >
            <PhoneOff />
          </button>

          <button
            onClick={acceptCall}
            className="btn btn-circle btn-success"
            title="Accept"
          >
            <Phone />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;