import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    profilePic: {
      type: String,
      default: "",
    },

    // 🔹 Role system (Admin Panel ready)
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    // 🔹 Ban system
    isBanned: {
      type: Boolean,
      default: false,
    },

    banReason: {
      type: String,
      default: "",
    },

    // 🔹 AI bot account
    isAI: {
      type: Boolean,
      default: false,
    },

    // 🔹 Presence
    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: null,
    },

    // 🔹 Custom wallpapers per chat
    chatWallpapers: {
      type: Map,
      of: String,
      default: {},
    },

    // 🔐 Security Questions
    securityQuestions: [
      {
        question: {
          type: String,
          required: true,
        },
        answer: {
          type: String,
          required: true,
          select: false, // never return answer
        },
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
