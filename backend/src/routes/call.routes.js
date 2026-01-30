import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { generateZegoToken } from "../lib/zegoToken.js";

const router = express.Router();

router.get("/zego-token", protectRoute, (req, res) => {
  const userId = req.user._id.toString();

  const token = generateZegoToken(
    Number(process.env.ZEGO_APP_ID),
    process.env.ZEGO_SERVER_SECRET,
    userId
  );

  res.json({ token });
});

export default router;