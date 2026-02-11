import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    reportedMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },

    reason: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved", "rejected"],
      default: "pending",
    },

    actionTaken: {
      type: String,
      enum: ["none", "message_deleted", "user_banned"],
      default: "none",
    },

    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin
    },
  },
  { timestamps: true }
);

const Report =
  mongoose.models.Report || mongoose.model("Report", reportSchema);

export default Report;