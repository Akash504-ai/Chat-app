import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
  setupSecurityQuestions,
  verifySecurityAnswers,
  resetPassword,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Auth
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", protectRoute, checkAuth);

// Profile
router.put("/update-profile", protectRoute, updateProfile);

// 🔐 Security Questions
router.put("/security-questions", protectRoute, setupSecurityQuestions);
router.post("/verify-security", verifySecurityAnswers);
router.post("/reset-password", resetPassword);

export default router;