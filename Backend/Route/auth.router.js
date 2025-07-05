require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const cors = require("cors");
const ejs = require("ejs");
const path = require("path");
const User = require("../Model/user.js");

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.json());
app.use(router);

// Check required environment variables
if (!process.env.EMAIL || !process.env.PASS) {  
    console.error("Missing EMAIL or PASS in environment variables.");
    process.exit(1);
}

// In-memory OTP store
const OTPStore = {};

// Nodemailer setup
const transPorter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
});

// Route: Send OTP
router.post("/send-OTP", async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const normalizedEmail = email.toLowerCase();
    const OTP = Math.floor(1000 + Math.random() * 9000).toString();

    OTPStore[normalizedEmail] = {
        otp: OTP,
        expiresAt: Date.now() + 5 * 60 * 1000,
    };

    try {
        await transPorter.sendMail({
            from: process.env.EMAIL,
            to: normalizedEmail,
            subject: "Your OTP Code",
            text: `Your OTP is ${OTP}. It is valid for 5 minutes.`,
        });

        res.json({ success: true, message: "OTP sent successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to send OTP" });
    }
});

// Route: Verify OTP
router.post("/verify-OTP", (req, res) => {
    const { email, otp } = req.body;
    const normalizedEmail = email.toLowerCase();

    const record = OTPStore[normalizedEmail];
    if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    delete OTPStore[normalizedEmail];
    res.json({ success: true, message: "OTP verified" });
});

// Route: Register
router.post("/register", async (req, res) => {
    const {
        firstName,
        lastName,
        address,
        email,
        password,
        courseDuration,
        admissionId,
        termsAccepted,
    } = req.body;

    if (!firstName || !lastName || !address || !email || !password || !courseDuration || !admissionId ) {
        return res.status(400).json({ error: true, message: "All fields are required!" });
    }

    try {
        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) return res.status(400).json({ error: "Email is already in use." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            address,
            email: normalizedEmail,
            password: hashedPassword,
            courseDuration,
            admissionId,
            termsAccepted,
            otpVerified : true,
            status: "pending"
        });

        await newUser.save();

        // await sendEmail(normalizedEmail, "Registration request sent", "request", { name: firstName });

        res.status(201).json({ success: true, message: "Registration request sent." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register user." });
    }
});

// Helper: Email sender
const sendEmail = async (to, subject, templateName, data) => {
    const templatePath = path.join(__dirname, "../templates", `${templateName}.ejs`);
    const htmlContent = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        html: htmlContent,
    };

    await transPorter.sendMail(mailOptions);
};

// Route: Admin approve user
router.post("/admin/approve/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, { status: "approved" }, { new: true });
        if (!user) return res.status(404).json({ message: "User not found" });

        await sendEmail(user.email.toLowerCase(), "Your request is approved!", "approval", { name: user.firstName });

        res.status(200).json({ message: "User approved and email sent" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Route: Login
router.post("/login", async (req, res) => {
    const { email, password, token} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }
    
    try {
        const normalized = email.toLowerCase();
        const user = await User.findOne({ email: normalized });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }
        // if (user.status !== "approved") {
        //     return res.status(403).json({ error: "Your request has not been approved yet." });
        // }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        res.status(200).json({
            success: true,
            message: "Login successful.",
            user: {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error during login." });
    }
});

router.post("/logout", async(req, res)=>{
    res.status(200).json({ success: true, message: "Logged out successfully." })
})

// Route: Get profile
router.get("/profile/:id", async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/ManagerProfile/:id", async (req, res) => {
    const { id, token } = req.body

    try {
        const user = await User.findById(id);
        if (!user && token == null) return res.status(404).json({ error: "User not found" });

        res.json(user); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
