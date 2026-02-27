import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import { sendWelcomeEmail } from "../lib/sendEmail.js";
import crypto from "crypto";

//signup
// Get fullName, email, password from req.body
// Check if any field is missing ---> if (!fullName || !email || !password)
// Validate password length (< 6)
// Convert email to lowercase
// Check if user already exists in DB
// Hash password using bcrypt
// Create new user in database
// Generate JWT token and set cookie
// Send user data (without password) in response
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body; //to make req.body working we use "app.use(express.json());"---this middleware in our "index.js/server.js"

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    const token = generateToken(newUser._id);

    // sendWelcomeEmail(newUser.email, newUser.fullName).catch((err) =>
    //   console.log("Email failed:", err.message),
    // );

    setImmediate(() => {
      sendWelcomeEmail(newUser.email, newUser.fullName).catch((err) =>
        console.log("Email failed:", err.message),
      );
    });

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      role: newUser.role,
      token,
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//login
// Get email, password from req.body
// Convert email to lowercase
// Find user by email and explicitly select password
// If user not found → return error
// Compare entered password with hashed password
// If password mismatch → return error
// Generate JWT token and set cookie
// Send user data (without password) in response
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password",
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (user.isBanned) {
      return res.status(403).json({
        message: "Your account has been banned",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//logout
// Clear JWT cookie by setting empty value
// Set cookie expiration to 0
// Send success response
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//update profile
// Get profilePic from req.body
// Get authenticated user ID from req.user
// Check if profilePic exists
// Upload image to Cloudinary
// Get secure_url from Cloudinary response
// Update user profilePic in database
// Return updated user data (without password)
export const updateProfile = async (req, res) => {
  const { profilePic, fullName } = req.body;
  const userId = req.user._id;

  try {
    const updateData = {};

    if (fullName) {
      updateData.fullName = fullName;
    }

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No data provided to update" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CHECK AUTH
// Middleware validates JWT
// Middleware attaches user to req.user
// Return req.user in response
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.isBanned) {
      return res.status(403).json({ message: "Account banned" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Check auth error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const setupSecurityQuestions = async (req, res) => {
  const { questions } = req.body; // [{question, answer}]
  const userId = req.user._id;

  try {
    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "Questions required" });
    }

    if (questions.length > 3) {
      return res.status(400).json({ message: "Max 3 questions allowed" });
    }

    const hashedQuestions = await Promise.all(
      questions.map(async (q) => ({
        question: q.question,
        answer: await bcrypt.hash(
          q.answer.toLowerCase().trim(),
          10
        ),
      }))
    );

    await User.findByIdAndUpdate(userId, {
      securityQuestions: hashedQuestions,
    });

    res.status(200).json({ message: "Security questions saved" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifySecurityAnswers = async (req, res) => {
  const { email, answers } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+securityQuestions.answer +passwordResetSession");

    if (!user || user.securityQuestions.length === 0) {
      return res.status(400).json({ message: "Invalid request" });
    }

    if (answers.length !== user.securityQuestions.length) {
      return res.status(400).json({ message: "Answers mismatch" });
    }

    for (let i = 0; i < answers.length; i++) {
      const isMatch = await bcrypt.compare(
        answers[i].toLowerCase().trim(),
        user.securityQuestions[i].answer
      );

      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect answers" });
      }
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.passwordResetSession = resetToken;
    await user.save();

    res.status(200).json({ resetToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  const { email, resetToken, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() })
      .select("+passwordResetSession +password");

    if (!user || user.passwordResetSession !== resetToken) {
      return res.status(400).json({ message: "Unauthorized reset attempt" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordResetSession = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};