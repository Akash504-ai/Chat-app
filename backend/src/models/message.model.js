import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Personal chat
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

    // Group chat
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null,
      index: true,
    },

    text: {
      type: String,
      trim: true,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    audio: {
      type: String,
      default: "",
    },

    file: {
      url: { type: String, default: "" },
      name: { type: String, default: "" },
      type: { type: String, default: "" },
      size: { type: Number, default: 0 },
    },

    // Message delivery status
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",
      index: true,
    },

    // Delete for me
    deletedFor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
    ],

    // Delete for everyone
    deletedForEveryone: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

// ✅ Safety checks
messageSchema.pre("validate", function (next) {
  // must be personal OR group
  if (!this.receiverId && !this.groupId) {
    return next(new Error("Message must have receiverId or groupId"));
  }

  // cannot be both
  if (this.receiverId && this.groupId) {
    return next(new Error("Message cannot have both receiverId and groupId"));
  }

  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;