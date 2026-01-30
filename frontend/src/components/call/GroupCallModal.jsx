import { Phone, PhoneOff } from "lucide-react";
import { useCallStore } from "../../store/useCallStore";

const GroupCallModal = () => {
  const { callStatus, isGroupCall, acceptCall, rejectCall } = useCallStore();

  if (callStatus !== "incoming" || !isGroupCall) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-base-100 p-6 rounded-xl w-80 text-center">
        <h3 className="text-lg font-bold">Incoming Group Call</h3>

        <div className="mt-5 flex justify-center gap-6">
          <button onClick={rejectCall} className="btn btn-circle btn-error">
            <PhoneOff />
          </button>

          <button onClick={acceptCall} className="btn btn-circle btn-success">
            <Phone />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupCallModal;