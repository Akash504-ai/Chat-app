import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createStatus,
  getStatuses,
  viewStatus,
  deleteStatus,
} from "../controllers/status.controller.js";
import { upload } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
  "/",
  protectRoute,
  upload.single("media"),
  createStatus
);

router.get("/", protectRoute, getStatuses);

router.post("/:statusId/view", protectRoute, viewStatus);

// 🗑 delete status
router.delete("/:statusId", protectRoute, deleteStatus);

export default router;
