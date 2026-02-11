import express from "express";
import {
  createReport,
  getAllReports,
  updateReportStatus,
  deleteReportedMessage,
  banUserFromReport,
  deleteReport,
} from "../controllers/report.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/admin.middleware.js";

const router = express.Router();

/*
========================================
USER ROUTES
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
// Optional query: /api/reports?status=pending
router.get("/", protectRoute, isAdmin, getAllReports);

// 🔹 Update report status manually
router.patch("/:id/status", protectRoute, isAdmin, updateReportStatus);

// 🔹 Delete reported message + auto resolve
router.patch(
  "/:id/delete-message",
  protectRoute,
  isAdmin,
  deleteReportedMessage
);

// 🔹 Ban user from report + auto resolve
router.patch(
  "/:id/ban-user",
  protectRoute,
  isAdmin,
  banUserFromReport
);

// 🔹 Permanently delete report (optional)
router.delete("/:id", protectRoute, isAdmin, deleteReport);

export default router;