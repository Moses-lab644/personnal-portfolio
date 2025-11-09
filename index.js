import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ POST route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // 1. Create transporter
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "Mosesudofiaphilip@gmail.com", // your Gmail
        pass: "dmyqvmigautjbqvf",   // Gmail App Password
      },
    });

    // 2. Send email
    await transporter.sendMail({
      from: email,
      to: "Mosesudofiaphilip@gmail.com", // where you want to receive messages
      subject: `New Contact Form Message from ${name}`,
      text: message,
      html: `<p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b><br>${message}</p>`,
    });

    res.send(`✅ Thank you for your message, ${name}! I will get back to you soon.`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

