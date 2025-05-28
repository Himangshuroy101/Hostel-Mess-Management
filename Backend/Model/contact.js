
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  sentAt: {
    type: Date,
    default: Date.now, // correct: pass the function, not the result
  },
});

module.exports = mongoose.model("Email", userSchema);
