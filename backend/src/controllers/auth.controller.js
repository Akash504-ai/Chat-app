import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

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
      return res.status(400).json({ message: "Password must be at least 6 characters" });
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
    });

    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
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
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
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
  const { profilePic } = req.body;
  const userId = req.user._id;

  try {
    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

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
export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Check auth error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};