import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { emitToUser } from "../lib/socket.js";
import { askAI } from "../services/ai.service.js";

export const chatWithAI = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false });
    }

    const { message } = req.body;
    const senderId = req.user._id;

    if (!message?.trim()) {
      return res.status(400).json({ success: false });
    }

    const aiUser = await User.findOne({ isAI: true });
    if (!aiUser) {
      return res.status(500).json({ success: false });
    }

    await Message.create({
      senderId,
      receiverId: aiUser._id,
      text: message,
      status: "seen",
    });

    const aiReply = await askAI(message);

    const aiMessage = await Message.create({
      senderId: aiUser._id,
      receiverId: senderId,
      text: aiReply,
      status: "seen",
    });

    emitToUser(senderId.toString(), "newMessage", aiMessage);

    res.json({ success: true });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ success: false });
  }
};