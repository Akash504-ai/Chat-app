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

    // Validate reported user
    if (reportedUserId) {
      const userExists = await User.findById(reportedUserId);
      if (!userExists) {
        return res.status(404).json({ message: "Reported user not found" });
      }
    }

    // Validate reported message
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
    const { status } = req.query;

    const filter = status ? { status } : {};

    const reports = await Report.find(filter)
      .populate("reporter", "fullName email")
      .populate("reportedUser", "fullName email")
      .populate("reportedMessage")
      .populate("resolvedBy", "fullName email")
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

    const allowedStatuses = ["pending", "reviewed", "resolved", "rejected"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

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
ADMIN — Delete Reported Message
========================================
*/

export const deleteReportedMessage = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if (!report.reportedMessage) {
      return res.status(400).json({
        message: "No message attached to this report",
      });
    }

    await Message.findByIdAndDelete(report.reportedMessage);

    report.status = "resolved";
    report.actionTaken = "message_deleted";
    report.resolvedBy = req.user._id;

    await report.save();

    res.status(200).json({
      message: "Message deleted and report resolved",
    });
  } catch (error) {
    console.error("Delete message error:", error.message);
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
    report.actionTaken = "user_banned";
    report.resolvedBy = req.user._id;

    await report.save();

    res.status(200).json({
      message: "User banned and report resolved",
    });
  } catch (error) {
    console.error("Ban from report error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/*
========================================
ADMIN — Delete Report Permanently (Optional)
========================================
*/

export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json({
      message: "Report deleted permanently",
    });
  } catch (error) {
    console.error("Delete report error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
