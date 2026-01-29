import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Group from "../models/group.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import mongoose from "mongoose";

/**
 * USERS FOR SIDEBAR (unchanged)
 */
export const getUsersForSidebar = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("_id fullName email profilePic");

    res.status(200).json(users);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * =========================
 * PRIVATE CHAT (1-to-1)
 * =========================
 */
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
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch {
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
    let fileData = { url: "", name: "", type: "", size: 0 };

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

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text: text?.trim() || "",
      image: imageUrl,
      audio: audioUrl,
      file: fileData,
      groupId: null,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * =========================
 * GROUP CHAT
 * =========================
 */
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return res.status(400).json({ message: "Invalid group id" });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.members.some(
      (m) => m.userId.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({ message: "Access denied" });
    }

    const messages = await Message.find({ groupId })
      .populate("senderId", "fullName profilePic")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("getGroupMessages error:", error);
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
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const isMember = group.members.some(
      (m) => m.userId.toString() === senderId.toString()
    );

    if (!isMember) {
      return res.status(403).json({ message: "You are not a group member" });
    }

    if (!text && !image && !audio && !file) {
      return res.status(400).json({ message: "Message cannot be empty" });
    }

    let imageUrl = "";
    let audioUrl = "";
    let fileData = { url: "", name: "", type: "", size: 0 };

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

    const newMessage = await Message.create({
      senderId,
      groupId,
      text: text?.trim() || "",
      image: imageUrl,
      audio: audioUrl,
      file: fileData,
      receiverId: null,
    });

    io.to(groupId.toString()).emit("newGroupMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("sendGroupMessage error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};