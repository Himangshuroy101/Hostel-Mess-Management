const express = require("express");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/,
    },
    lastName: {
        type: String,
        required: true,
        match: /^[A-Za-z]+$/,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    courseDuration: {
        type: String,
        enum: ["1 Year", "2 Year", "3 Year", "4 Year"],
        required: true,
    },
    admissionId: {
        type: String,
        required: true,
        match: /^\d{6}$/,
    },
    termsAccepted: {
        type: Boolean,
        required: true,
    },
    otp: {
        type: String,
    },
    otpVerified: {
        type: Boolean,
        default: false,
    },
    token:{
        type: String,
        default: null,
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
