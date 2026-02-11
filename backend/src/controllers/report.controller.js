import Report from "../models/report.model.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

/*
========================================
USER SIDE — Create Report
========================================
*/

export const createReport = async (req, res) => {
  try {
    const { reportedUserId, reportedMessageId, reason } = req.body;

    if (!reason) {
      return res.status(400).json({ message: "Reason is required" });
    }

    if (!reportedUserId && !reportedMessageId) {
      return res.status(400).json({
        message: "You must report a user or a message",
      });
    }

    // Optional validation check
    if (reportedUserId) {
      const userExists = await User.findById(reportedUserId);
      if (!userExists) {
        return res.status(404).json({ message: "Reported user not found" });
      }
    }

    if (reportedMessageId) {
      const messageExists = await Message.findById(reportedMessageId);
      if (!messageExists) {
        return res.status(404).json({ message: "Reported message not found" });
      }
    }

    const report = await Report.create({
      reporter: req.user._id,
      reportedUser: reportedUserId,
      reportedMessage: reportedMessageId,
      reason,
    });

    res.status(201).json({
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("Create report error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*
========================================
ADMIN SIDE — Get All Reports
========================================
*/

export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter", "fullName email")
      .populate("reportedUser", "fullName email")
      .populate("reportedMessage")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    console.error("Get reports error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*
========================================
ADMIN SIDE — Update Report Status
========================================
*/

export const updateReportStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    res.status(200).json({
      message: "Report status updated",
      report,
    });
  } catch (error) {
    console.error("Update report error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*
========================================
ADMIN — Ban User From Report
========================================
*/

export const banUserFromReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (!report.reportedUser) {
      return res.status(400).json({
        message: "No user attached to this report",
      });
    }

    const user = await User.findById(report.reportedUser);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBanned = true;
    await user.save();

    report.status = "resolved";
    await report.save();

    res.status(200).json({
      message: "User banned and report resolved",
    });
  } catch (error) {
    console.error("Ban from report error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
