const mongoose = require("mongoose");
const { type } = require("os");

const userSchema= new mongoose.Schema({
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
    meals:  {
         lunch: {
            type: Boolean,
             default: false,
             required: true
         },
         dinner: {
             type: Boolean,
             default: false,
             required: true
         },
         type: {
            type: String,
            enum: ["veg", "chicken", "fish"],
            required: true,
         }
    }

});

module.exports = ("Meal", userSchema);
