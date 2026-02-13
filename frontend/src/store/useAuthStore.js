import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useCallStore } from "./useCallStore";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // =====================
  // AUTH
  // =====================
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null, onlineUsers: [] });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // =====================
  // SOCKET
  // =====================
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser) return;

    // 🧹 Clean old socket
    if (socket) socket.disconnect();

    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // =====================
    // 📞 1–1 CALL EVENTS
    // =====================
    newSocket.on("call:incoming", (data) => {
      useCallStore.getState().receiveCall(data);
    });

    newSocket.on("call:accepted", () => {
      useCallStore.setState({ callStatus: "in-call" });
    });

    newSocket.on("call:rejected", () => {
      useCallStore.getState().resetCall();
    });

    newSocket.on("call:ended", () => {
      useCallStore.getState().resetCall();
    });

    newSocket.on("call:busy", () => {
      toast.error("User is busy on another call");
      useCallStore.getState().resetCall();
    });

    // =====================
    // 👥 GROUP CALL EVENTS
    // =====================
    newSocket.on("group:call:incoming", (data) => {
      useCallStore.getState().receiveGroupCall(data);
    });

    newSocket.on("group:call:ended", () => {
      useCallStore.getState().resetCall();
    });

    newSocket.on("group:call:already-active", () => {
      toast.error("A group call is already active");
      useCallStore.getState().resetCall();
    });

    set({ socket: newSocket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  },
}));