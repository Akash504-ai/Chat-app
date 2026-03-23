import express from "express";
import {
  getAllUsers,
  toggleBanUser,
  deleteUser,
} from "../controllers/admin.controller.js";
import { getDashboardStats } from "../controllers/admin.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, isAdmin, getAllUsers);

router.patch("/users/:id/ban", protectRoute, isAdmin, toggleBanUser);

router.delete("/users/:id", protectRoute, isAdmin, deleteUser);

router.get("/dashboard", protectRoute, isAdmin, getDashboardStats);

export default router;