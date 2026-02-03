import { create } from "zustand";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useCallStore = create((set, get) => ({
  // =====================
  // Call state
  // =====================
  callStatus: "idle", // idle | outgoing | incoming | in-call
  callType: null, // voice | video
  caller: null,
  receiver: null,
  roomId: null,
  callTimeoutId: null,

  // ===== GROUP CALL =====
  isGroupCall: false,
  groupId: null,

  // =====================
  // Reset (SAFE)
  // =====================
  resetCall: () => {
    const { callTimeoutId } = get();
    if (callTimeoutId) clearTimeout(callTimeoutId);

    set({
      callStatus: "idle",
      callType: null,
      caller: null,
      receiver: null,
      roomId: null,
      callTimeoutId: null,
      isGroupCall: false,
      groupId: null,
    });
  },

  // =====================
  // 📞 1–1 OUTGOING CALL
  // =====================
  startCall: ({ receiver, callType }) => {
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;
    if (!socket || !authUser) return;

    // ✅ STABLE ROOM ID
    const ids = [authUser._id, receiver._id].sort();
    const roomId = `call_${ids[0]}_${ids[1]}`;

    set({
      callStatus: "outgoing",
      callType,
      caller: authUser,
      receiver,
      roomId,
      isGroupCall: false,
      groupId: null,
    });

    socket.emit("call:invite", {
      to: receiver._id,
      callType,
      roomId,
    });

    // ⏱️ timeout ONLY while ringing
    const timeoutId = setTimeout(() => {
      if (get().callStatus !== "in-call") {
        toast.error("No answer");
        get().endCall(true);
      }
    }, 30000);

    set({ callTimeoutId: timeoutId });
  },

  // =====================
  // 📲 INCOMING CALL
  // =====================
  receiveCall: ({ caller, callType, roomId }) => {
    const authUser = useAuthStore.getState().authUser;

    set({
      callStatus: "incoming",
      callType,
      caller,
      receiver: authUser,
      roomId,
      isGroupCall: false,
      groupId: null,
    });
  },

  // =====================
  // ✅ ACCEPT CALL
  // =====================
  acceptCall: () => {
    const socket = useAuthStore.getState().socket;
    const { caller, roomId, callTimeoutId, isGroupCall, groupId } = get();
    if (!socket) return;

    // 🔥 CRITICAL FIX
    if (callTimeoutId) clearTimeout(callTimeoutId);

    if (isGroupCall) {
      socket.emit("group:call:accept", { groupId });
    } else {
      socket.emit("call:accept", {
        to: caller._id,
        roomId,
      });
    }

    set({
      callStatus: "in-call",
      callTimeoutId: null,
    });
  },

  // =====================
  // ❌ REJECT CALL
  // =====================
  rejectCall: () => {
    const socket = useAuthStore.getState().socket;
    const { caller, isGroupCall, groupId } = get();

    if (socket) {
      if (isGroupCall) {
        socket.emit("group:call:reject", { groupId });
      } else if (caller) {
        socket.emit("call:reject", { to: caller._id });
      }
    }

    get().resetCall();
  },

  // =====================
  // 🔚 END CALL (SAFE)
  // =====================
  endCall: (silent = false) => {
    const socket = useAuthStore.getState().socket;
    const { caller, receiver, isGroupCall, groupId, callStatus } = get();

    if (!silent && socket && callStatus !== "idle") {
      if (isGroupCall) {
        socket.emit("group:call:end", { groupId });
      } else {
        socket.emit("call:end", {
          to: caller?._id || receiver?._id,
        });
      }
    }

    get().resetCall();
  },

  // =====================
  // 👥 START GROUP CALL
  // =====================
  startGroupCall: ({ groupId, callType }) => {
    const socket = useAuthStore.getState().socket;
    const authUser = useAuthStore.getState().authUser;
    if (!socket || !authUser) return;

    const roomId = `group_${groupId}`;

    set({
      callStatus: "in-call",
      callType,
      caller: authUser,
      receiver: null,
      roomId,
      isGroupCall: true,
      groupId,
    });

    socket.emit("group:call:start", {
      groupId,
      callType,
      roomId,
    });
  },

  // =====================
  // 👥 INCOMING GROUP CALL
  // =====================
  receiveGroupCall: ({ groupId, callType, roomId, caller }) => {
    set({
      callStatus: "incoming",
      callType,
      caller,
      receiver: null,
      roomId,
      isGroupCall: true,
      groupId,
    });
  },
}));
