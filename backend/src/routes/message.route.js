import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersForSidebar,
  getMessages,
  sendMessage,
  getGroupMessages,
  sendGroupMessage,
  deleteMessageForMe,
  deleteMessageForEveryone,
  markMessagesSeen,
  updateChatWallpaper,
  removeChatWallpaper,
  searchMessages,
  searchGroupMessages,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

// 🔍 Search messages
router.get("/search/:userId", protectRoute, searchMessages);
router.get("/group/search/:groupId", protectRoute, searchGroupMessages);

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

router.get("/group/:groupId", protectRoute, getGroupMessages);
router.post("/group/send/:groupId", protectRoute, sendGroupMessage);

router.delete("/:messageId/me", protectRoute, deleteMessageForMe);
router.delete("/:messageId/everyone", protectRoute, deleteMessageForEveryone);

router.put("/mark-seen/:userId", protectRoute, markMessagesSeen);
router.put("/chat-wallpaper", protectRoute, updateChatWallpaper);
router.delete("/chat-wallpaper", protectRoute, removeChatWallpaper);


export default router;
