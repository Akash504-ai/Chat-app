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
      required: true,
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

const Message = mongoose.model("Message", messageSchema);

export default Message;