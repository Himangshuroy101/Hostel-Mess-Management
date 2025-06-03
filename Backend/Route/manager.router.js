const express = require("express");
const router = express.Router();
const User = require("../Model/meal.js");

router.post("/students", async(req,res) => {
    try{
        const{name, lunch, dinner, type} =req.body;

        const newStudent = new User({
            name,
            meals: {
                lunch,
                dinner,
                type
            }
        });

        await newStudent.save();
        res.status(201).json({ message: "Student added successfully", student: newStudent});
    }catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.get("/students", async(req,res) => {
   try{
     const students = await User.find();
     res.json(students);
   }catch(err) {
    res.status(500).json({error: err.message});
   }
});

router.get("/meals/summary", async(req,res) =>{
    try{
        const currentHour = new Date().getHours();
        const isDinner = currentHour >= 18 || currentHour <6;
        const mealField = isDinner ? "meals.dinner" : "meals.lunch" ;

        const matchedStudents = await User.find({ [mealField]: true });

        const mealOnStudents = matchedStudents.length;

        let veg =0;
        let chicken =0;
        let fish =0;

        matchedStudents.forEach(student => {
            const type = student.meals?.type;
            if(type === "veg") veg++;
            else if(type === "chicken") chicken++;
            else if (type === "fish") fish++;
        });

        const nonvegTotal = chicken + fish;

        res.json({
            mealOnStudents,
            totalActiveMeals: {
                veg,
                nonveg: {
                    total:nonvegTotal,
                    chicken,
                    fish
                }
            }
        });
    }catch (err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router;