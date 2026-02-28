export const sendWelcomeEmail = async (email, fullName) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: {
          name: "PASO",
          email: "santraakash999@gmail.com",
        },
        to: [{ email }],
        subject: "Welcome to PASO - the best chat app",
        htmlContent: `
          <div style="font-family:sans-serif;">
            <h2>Welcome to PASO</h2>
            <p>Hey ${fullName},</p>
            <p>Welcome to <b>PASO</b> — the best AI/ML integrated chat-app.</p>
            <p>Smart replies. Toxic detection. AI assistant.</p>
            <p>Let’s chat smarter 😎</p>
          </div>
        `,
      }),
    });

    const data = await response.text();

    if (!response.ok) {
      console.error("Brevo API Error:", data);
    } else {
      console.log("Email sent successfully:", data);
    }

  } catch (error) {
    console.error("Brevo error:", error);
  }
};