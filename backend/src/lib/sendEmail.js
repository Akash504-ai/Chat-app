import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // if using gmail
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: `"PASO Chat App" <${process.env.EMAIL}>`,
      to,
      subject: "Welcome to PASO 🚀",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome to PASO 🎉</h2>
          <p>Hi ${name},</p>
          <p>We're excited to have you on board.</p>
          <p><strong>PASO</strong> – The best chat app for seamless conversations.</p>
          <br/>
          <p>Start chatting now and enjoy 🚀</p>
          <hr/>
          <small>If you did not sign up, please ignore this email.</small>
        </div>
      `,
    });

    console.log("✅ Welcome email sent");
  } catch (error) {
    console.log("❌ Email sending failed:", error.message);
  }
};