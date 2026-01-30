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

const userSocketMap = {};

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

    const groups = await Group.find({
      "members.userId": userId,
    }).select("_id");

    groups.forEach((group) => {
      socket.join(group._id.toString());
    });
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", ({ to }) => {
    socket.to(to).emit("typing", { from: userId });
  });

  socket.on("stopTyping", ({ to }) => {
    socket.to(to).emit("stopTyping", { from: userId });
  });

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

  socket.on("groupMessageSeen", async ({ messageId, groupId }) => {
    socket.to(groupId).emit("groupMessageSeen", {
      messageId,
      userId,
    });
  });

  socket.on("disconnect", () => {
    if (userId) delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };