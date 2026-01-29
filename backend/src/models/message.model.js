import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },

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
  },
  { timestamps: true }
);

// Safety check: either receiverId or groupId must exist
messageSchema.pre("validate", function (next) {
  if (!this.receiverId && !this.groupId) {
    return next(
      new Error("Message must have either receiverId or groupId")
    );
  }
  next();
});

const Message = mongoose.model("Message", messageSchema);

export default Message;