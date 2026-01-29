import { Server } from "socket.io";
import http from "http";
import express from "express";
import Group from "../models/group.model.js";
import Message from "../models/message.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// userId -> socketId
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", async (socket) => {
  console.log("🔌 User connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;

    // personal room (VERY IMPORTANT)
    socket.join(userId);

    // join group rooms
    const groups = await Group.find({
      "members.userId": userId,
    }).select("_id");

    groups.forEach((group) => {
      socket.join(group._id.toString());
    });
  }

  // 🔵 ONLINE USERS
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // =========================
  // ⌨️ TYPING INDICATOR
  // =========================
  socket.on("typing", ({ to }) => {
    socket.to(to).emit("typing", { from: userId });
  });

  socket.on("stopTyping", ({ to }) => {
    socket.to(to).emit("stopTyping", { from: userId });
  });

  // =========================
  // 👀 MESSAGE SEEN (1–1)
  // =========================
  socket.on("messageSeen", async ({ messageIds, senderId }) => {
    await Message.updateMany(
      { _id: { $in: messageIds } },
      { status: "seen" }
    );

    const senderSocketId = getReceiverSocketId(senderId);
    if (senderSocketId) {
      io.to(senderSocketId).emit("messageStatusUpdateBulk", {
        messageIds,
        status: "seen",
      });
    }
  });

  // =========================
  // 👀 GROUP MESSAGE SEEN (BASE)
  // =========================
  socket.on("groupMessageSeen", async ({ messageId, groupId }) => {
    // later you’ll push userId into seenBy[]
    socket.to(groupId).emit("groupMessageSeen", {
      messageId,
      userId,
    });
  });

  // =========================
  // DISCONNECT
  // =========================
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };