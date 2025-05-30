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

router.post("/meal-OFF", async(req,res)=>{
    const {meal} = req.body;

    
})