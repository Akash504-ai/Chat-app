import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (to, name) => {
  try {
    await resend.emails.send({
      from: "PASO <onboarding@resend.dev>", // default testing domain
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