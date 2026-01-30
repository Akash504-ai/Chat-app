import express from "express";
import { chatWithAI } from "../controllers/ai.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * POST /api/ai/chat
 * Body: { message }
 * Protected route (user must be logged in)
 */
router.post("/chat", protectRoute, chatWithAI);

export default router;