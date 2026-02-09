import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Group from "../models/group.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "_id fullName email profilePic isAI isOnline lastSeen",
    );

    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const myId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: id },
        { senderId: id, receiverId: myId },
      ],
      deletedForEveryone: false,
      deletedFor: { $ne: myId },
    }).sort({ createdAt: 1 });

    await Message.updateMany(
      { senderId: id, receiverId: myId, status: { $ne: "seen" } },
      { status: "seen" },
    );

    const senderSocketId = getReceiverSocketId(id);
    if (senderSocketId) {
      const seenMessages = await Message.find({
        senderId: id,
        receiverId: myId,
        status: "seen",
      }).select("_id");

      io.to(senderSocketId).emit("messageStatusUpdateBulk", {
        messageIds: seenMessages.map((m) => m._id),
        status: "seen",
      });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, audio, file } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Invalid receiver id" });
    }

    if (!text && !image && !audio && !file) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let imageUrl = "";
    let audioUrl = "";
    let fileData = null;

    if (image) {
      const upload = await cloudinary.uploader.upload(image, {
        resource_type: "auto",
      });
      imageUrl = upload.secure_url;
    }

    if (audio) {
      const upload = await cloudinary.uploader.upload(audio, {
        resource_type: "video",
      });
      audioUrl = upload.secure_url;
    }

    if (file?.base64) {
      const upload = await cloudinary.uploader.upload(file.base64, {
        resource_type: "raw",
      });
      fileData = {
        url: upload.secure_url,
        name: file.name,
        type: file.type,
        size: file.size,
      };
    }

    let message = await Message.create({
      senderId,
      receiverId,
      text: text?.trim() || "",
      image: imageUrl,
      audio: audioUrl,
      file: fileData,
      status: "sent",
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);

    if (receiverSocketId) {
      message = await Message.findByIdAndUpdate(
        message._id,
        { status: "delivered" },
        { new: true },
      );

      io.to(receiverSocketId).emit("newMessage", message);

      if (senderSocketId) {
        io.to(senderSocketId).emit("messageStatusUpdate", {
          messageId: message._id,
          status: "delivered",
        });
      }
    }

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid group id" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const isMember = group.members.some(
      (m) => m.userId.toString() === userId.toString(),
    );
    if (!isMember) return res.status(403).json({ message: "Access denied" });

    const messages = await Message.find({
      groupId,
      deletedForEveryone: false,
      deletedFor: { $ne: userId },
    })
      .populate("senderId", "fullName profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendGroupMessage = async (req, res) => {
  try {
    const { groupId } = req.params;
    const senderId = req.user._id;
    const { text, image, audio, file } = req.body;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid group id" });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    const isMember = group.members.some(
      (m) => m.userId.toString() === senderId.toString(),
    );
    if (!isMember)
      return res.status(403).json({ message: "Not a group member" });

    let imageUrl = "";
    let audioUrl = "";
    let fileData = null;

    if (image) {
      const upload = await cloudinary.uploader.upload(image, {
        resource_type: "auto",
      });
      imageUrl = upload.secure_url;
    }

    if (audio) {
      const upload = await cloudinary.uploader.upload(audio, {
        resource_type: "video",
      });
      audioUrl = upload.secure_url;
    }

    if (file?.base64) {
      const upload = await cloudinary.uploader.upload(file.base64, {
        resource_type: "raw",
      });
      fileData = {
        url: upload.secure_url,
        name: file.name,
        type: file.type,
        size: file.size,
      };
    }

    const message = await Message.create({
      senderId,
      groupId,
      text: text?.trim() || "",
      image: imageUrl,
      audio: audioUrl,
      file: fileData,
      status: "sent",
    });

    io.to(groupId.toString()).emit("newGroupMessage", message);

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMessageForMe = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    await Message.findByIdAndUpdate(messageId, {
      $addToSet: { deletedFor: userId },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMessageForEveryone = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message || !message.senderId.equals(userId)) {
      return res.status(403).json({ message: "Action not allowed" });
    }

    message.deletedForEveryone = true;
    await message.save();

    if (message.groupId) {
      io.to(message.groupId.toString()).emit("messageDeletedEveryone", {
        messageId,
      });
    } else {
      [message.senderId, message.receiverId].forEach((id) => {
        if (id)
          io.to(id.toString()).emit("messageDeletedEveryone", { messageId });
      });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT /messages/mark-seen/:userId
export const markMessagesSeen = async (req, res) => {
  const myId = req.user._id;
  const otherUserId = req.params.userId;

  await Message.updateMany(
    {
      senderId: otherUserId,
      receiverId: myId,
      status: { $ne: "seen" },
    },
    { status: "seen" },
  );

  const senderSocketId = getReceiverSocketId(otherUserId);
  if (senderSocketId) {
    const messages = await Message.find({
      senderId: otherUserId,
      receiverId: myId,
      status: "seen",
    }).select("_id");

    io.to(senderSocketId).emit("messageStatusUpdateBulk", {
      messageIds: messages.map((m) => m._id),
      status: "seen",
    });
  }

  res.sendStatus(200);
};
