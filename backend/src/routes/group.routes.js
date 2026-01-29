import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createGroup,
  getMyGroups,
  getGroupById,
  addUserToGroup,
  removeUserFromGroup,
  leaveGroup,
  updateGroup,
  deleteGroup,
} from "../controllers/group.controller.js";

const router = express.Router();

router.post("/create", protectRoute, createGroup);
router.get("/", protectRoute, getMyGroups);
router.get("/:id", protectRoute, getGroupById);
router.post("/:id/add-user", protectRoute, addUserToGroup);
router.post("/:id/remove-user", protectRoute, removeUserFromGroup);
router.post("/:id/leave", protectRoute, leaveGroup);
router.patch("/:id/update", protectRoute, updateGroup);
router.delete("/:id", protectRoute, deleteGroup);

export default router;