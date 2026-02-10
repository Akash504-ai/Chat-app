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

    // 🔹 ADD THIS
    isAI: {
      type: Boolean,
      default: false,
    },

    // 🔹 Last seen & presence
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: null,
    },

    chatWallpapers: {
      type: Map,
      of: String, // Cloudinary URL
      default: {},
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
