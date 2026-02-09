import { Server } from "socket.io";
import http from "http";
import express from "express";
import Group from "../models/group.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};
const activeCalls = new Set();
const activeGroupCalls = new Map();

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

export function emitToUser(userId, event, payload) {
  const socketId = userSocketMap[userId];
  if (socketId) {
    io.to(socketId).emit(event, payload);
  }
}

io.on("connection", async (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.join(userId);

    await User.findByIdAndUpdate(userId, {
      isOnline: true,
    });

    const groups = await Group.find({
      "members.userId": userId,
    }).select("_id");

    groups.forEach((group) => {
      socket.join(group._id.toString());
    });
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // =====================
  // Typing
  // =====================
  socket.on("typing", ({ to }) => {
    socket.to(to).emit("typing", { from: userId });
  });

  socket.on("stopTyping", ({ to }) => {
    socket.to(to).emit("stopTyping", { from: userId });
  });

  // =====================
  // Message seen
  // =====================
  socket.on("messageSeen", async ({ messageIds, senderId }) => {
    await Message.updateMany({ _id: { $in: messageIds } }, { status: "seen" });

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageStatusUpdateBulk", {
        messageIds,
        status: "seen",
      });
    }
  });

  socket.on("groupMessageSeen", async ({ messageId, groupId }) => {
    socket.to(groupId).emit("groupMessageSeen", {
      messageId,
      userId,
    });
  });

  // =====================
  // 📞 CALL SIGNALING
  // =====================

  // Invite
  socket.on("call:invite", ({ to, callType, roomId }) => {
    // 🚫 busy check
    if (activeCalls.has(to)) {
      socket.emit("call:busy");
      return;
    }

    activeCalls.add(userId);
    activeCalls.add(to);

    socket.to(to).emit("call:incoming", {
      caller: { _id: userId },
      callType,
      roomId,
    });
  });

  // Accept
  socket.on("call:accept", ({ to, roomId }) => {
    socket.to(to).emit("call:accepted", { roomId });
  });

  // Reject
  socket.on("call:reject", ({ to }) => {
    activeCalls.delete(userId);
    activeCalls.delete(to);

    socket.to(to).emit("call:rejected");
  });

  // End
  socket.on("call:end", ({ to }) => {
    activeCalls.delete(userId);
    activeCalls.delete(to);

    socket.to(to).emit("call:ended");
  });

  // =====================
  // 👥 GROUP CALL
  // =====================

  // Start group call
  socket.on("group:call:start", ({ groupId, callType, roomId }) => {
    if (activeGroupCalls.has(groupId)) {
      socket.emit("group:call:already-active");
      return;
    }

    activeGroupCalls.set(groupId, roomId);

    socket.to(groupId).emit("group:call:incoming", {
      groupId,
      callType,
      roomId,
      caller: { _id: userId },
    });
  });

  // End group call
  socket.on("group:call:end", ({ groupId }) => {
    activeGroupCalls.delete(groupId);
    socket.to(groupId).emit("group:call:ended", { groupId });
  });

  // =====================
  // Disconnect
  // =====================
  socket.on("disconnect", async () => {
    if (userId) {
      delete userSocketMap[userId];
      activeCalls.delete(userId);

      // ✅ ADD THIS
      await User.findByIdAndUpdate(userId, {
        isOnline: false,
        lastSeen: new Date(),
      });

      // 🔁 Optional real-time broadcast
      socket.broadcast.emit("userLastSeenUpdate", {
        userId,
        isOnline: false,
        lastSeen: new Date(),
      });
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
