import express from "express";
import {
  createReport,
  getAllReports,
  updateReportStatus,
} from "../controllers/report.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import { banUserFromReport } from "../controllers/report.controller.js";

const router = express.Router();

/*
========================================
USER ROUTE
========================================
*/

// 🔹 Create report (any logged-in user)
router.post("/", protectRoute, createReport);

/*
========================================
ADMIN ROUTES
========================================
*/

// 🔹 Get all reports (admin only)
router.get("/", protectRoute, isAdmin, getAllReports);

// 🔹 Update report status (admin only)
router.patch("/:id/status", protectRoute, isAdmin, updateReportStatus);

// 🔹 Ban user directly from report
router.patch("/:id/ban-user", protectRoute, isAdmin, banUserFromReport);

export default router;
