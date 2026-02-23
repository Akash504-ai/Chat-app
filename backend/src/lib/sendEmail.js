import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.BREVO_SMTP_HOST,
  port: Number(process.env.BREVO_SMTP_PORT),
  secure: false, // 587
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

export const sendWelcomeEmail = async (to, name) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM, // must be verified in Brevo
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