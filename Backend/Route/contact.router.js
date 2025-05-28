const express = require("express");
const nodemailer = require("nodemailer");
const Email = require("../Model/contact.js"); // Assuming Mongoose model
require("dotenv").config();

const router = express.Router();

// POST /send-email
router.post("/send-email", async (req, res) => {
  const { username, email, message } = req.body;

  if (!username || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: `New message from ${username}`,
    text: `Message:\n${message}\n\nFrom: ${username} <${email}>`,
    replyTo: email,
  };

  try {
    // Optional: Save to MongoDB
    const newEntry = new Email({ username, email, message });
    await newEntry.save();

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent and saved successfully!" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Failed to send email or save message.", error });
  }
});

module.exports = router;
