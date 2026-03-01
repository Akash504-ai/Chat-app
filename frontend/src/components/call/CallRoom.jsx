import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useCallStore } from "../../store/useCallStore";
import { useAuthStore } from "../../store/useAuthStore";

const CallRoom = () => {
  const containerRef = useRef(null);
  const zegoRef = useRef(null);

  const { callStatus, callType, roomId, endCall, isGroupCall } = useCallStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (callStatus !== "in-call") return;
    if (!containerRef.current || !roomId || !authUser) return;
    if (zegoRef.current) return; // 🔒 BLOCK re-init

    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;

    console.log("AppID:", appID);
    console.log("ServerSecret:", serverSecret);
    console.log("RoomID:", roomId);
    console.log("UserID:", String(authUser._id));

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      String(authUser._id),
      authUser.fullName || "User",
    );

    const zego = ZegoUIKitPrebuilt.create(kitToken);
    zegoRef.current = zego;

    zego.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: isGroupCall
          ? ZegoUIKitPrebuilt.GroupCall
          : ZegoUIKitPrebuilt.OneONoneCall,
      },
      turnOnCameraWhenJoining: callType === "video",
      turnOnMicrophoneWhenJoining: true,
      showPreJoinView: false,
      showLeavingView: false,
      onLeaveRoom: () => {
        handleEndCall();
      },
    });
  }, [callStatus]);

  const handleEndCall = () => {
    try {
      zegoRef.current?.leaveRoom();
    } catch {}
    zegoRef.current = null;
    endCall();
  };

  if (callStatus !== "in-call") return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default CallRoom;
