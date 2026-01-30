import { Phone, PhoneOff, Video } from "lucide-react";
import { useCallStore } from "../../store/useCallStore";

const IncomingCallModal = () => {
  const {
    callStatus,
    callType,
    caller,
    acceptCall,
    rejectCall,
  } = useCallStore();

  if (callStatus !== "incoming") return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-80 rounded-xl bg-base-100 p-6 shadow-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            {callType === "video" ? (
              <Video className="text-primary" />
            ) : (
              <Phone className="text-primary" />
            )}
          </div>

          <h3 className="text-lg font-semibold">Incoming Call</h3>
          <p className="text-sm text-base-content/70">
            User is calling you
          </p>

          <div className="mt-4 flex gap-4">
            <button
              onClick={rejectCall}
              className="btn btn-circle btn-error"
            >
              <PhoneOff />
            </button>

            <button
              onClick={acceptCall}
              className="btn btn-circle btn-success"
            >
              <Phone />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallModal;