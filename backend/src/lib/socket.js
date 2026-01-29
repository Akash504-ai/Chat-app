import { Server } from "socket.io";
import http from "http";
import express from "express";
import Group from "../models/group.model.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// { userId: socketId }
const userSocketMap = {};

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", async (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;

    // personal room
    socket.join(userId);

    // join all groups
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
  // typing
  socket.on("typing", ({ chatType, to }) => {
    socket.to(to).emit("typing", {
      userId,
      chatType,
      to, 
    });
  });

  socket.on("stopTyping", ({ chatType, to }) => {
    socket.to(to).emit("stopTyping", {
      userId,
      chatType,
      to, 
    });
  });

  // =========================
  // DISCONNECT
  // =========================
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
