require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./Model/user.js");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Server
const port = 5050;
app.listen(port, () =>
    console.log(`🚀 Server running on http://localhost:${port}/`)
);

// Authentication 
const authRoute = require("./Route/auth.router.js");
app.use("/", authRoute);

const contact = require("./Route/contact.router.js")
app.use("/", contact)

// Route: Root
app.get("/", (req, res) => {
    res.send("Hello, this is Supriyo's server!");
});
