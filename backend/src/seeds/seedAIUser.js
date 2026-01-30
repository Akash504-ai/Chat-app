import User from "../models/user.model.js";

const seedAIUser = async () => {
  try {
    const existingAI = await User.findOne({ isAI: true });
    if (existingAI) {
      console.log("🤖 AI user already exists");
      return;
    }

    await User.create({
      email: "ai@chat.app",
      fullName: "Meta AI",
      password: "ai-system-password", // never used
      profilePic: "https://about.fb.com/wp-content/uploads/2024/04/Meta-AI-Expasion_Header.gif",
      isAI: true,
    });

    console.log("🤖 AI user created successfully");
  } catch (err) {
    console.error("❌ Failed to seed AI user:", err.message);
  }
};

export default seedAIUser;