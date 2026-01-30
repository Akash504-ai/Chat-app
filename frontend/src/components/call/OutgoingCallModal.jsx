import { PhoneOff } from "lucide-react";
import { useCallStore } from "../../store/useCallStore";

const OutgoingCallModal = () => {
  const {
    callStatus,
    receiver,
    callType,
    endCall,
  } = useCallStore();

  if (callStatus !== "outgoing") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-80 rounded-xl bg-base-100 p-6 shadow-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
            <span className="text-xl font-bold">
              {receiver?.fullName?.[0]}
            </span>
          </div>

          <h3 className="text-lg font-semibold">
            Calling {receiver?.fullName}
          </h3>

          <p className="text-sm text-base-content/60">
            {callType === "video" ? "Video call" : "Voice call"}
          </p>

          <button
            onClick={endCall}
            className="btn btn-circle btn-error mt-4"
            title="Cancel call"
          >
            <PhoneOff />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutgoingCallModal;