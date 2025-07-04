const express = require("express");
const router = express.Router();
const User = require("../Model/user.js");
const Meal = require("../Model/meal.js");
// Add a student
router.post("/students", async (req, res) => {
  try {
    const { firstName, lastName, lunch, dinner, type } = req.body;

    // Basic input validation
    if (!firstName || !lastName || typeof lunch !== "boolean" || typeof dinner !== "boolean" || !type) {
      return res.status(400).json({ error: "Invalid input. Please provide all required fields." });
    }

    const newStudent = new Meal({
      firstName,
      lastName,
      meals: {
        lunch,
        dinner,
        type
      }
    });

    await newStudent.save();

    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await User.find().select("firstName lastName meals"); // optimized response
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get meal summary
router.get("/meals/summary", async (req, res) => {
  try {
    const currentHour = new Date().getHours();
    const isDinner = currentHour >= 18 || currentHour < 6;
    const mealField = isDinner ? "meals.dinner" : "meals.lunch";

    const matchedStudents = await User.find({ [mealField]: true });

    const mealOnStudents = matchedStudents.length;

    let veg = 0, chicken = 0, fish = 0;

    matchedStudents.forEach(student => {
      const type = student.meals?.type;
      if (type === "veg") veg++;
      else if (type === "chicken") chicken++;
      else if (type === "fish") fish++;
    });

    res.json({
      mealOnStudents,
      totalActiveMeals: {
        veg,
        nonveg: {
          total: chicken + fish,
          chicken,
          fish
        }
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
