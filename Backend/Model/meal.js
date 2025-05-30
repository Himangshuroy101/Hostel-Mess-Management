const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
    meal: {
        type: Boolean,
        default: false,
    },
    
})

module.exports = mongoose.model("MealSetup", MealSchema)