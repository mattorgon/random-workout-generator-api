const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");
const { fetchSavedWorkouts } = require("../utils/Database");

// POST endpoint to save workout data
router.post("/saveWorkout", async (req, res) => {
  try {
    const { userId, savedExercises } = req.body;

    const userWorkout = new Workout({
      user: userId, // Use the user's _id here
      date: new Date(),
      exercises: savedExercises.map((exerciseName) => ({
        name: exerciseName,
      })),
    });

    const savedWorkout = await userWorkout.save();

    res
      .status(200)
      .json({ message: "Workout saved successfully", workout: savedWorkout });
  } catch (error) {
    console.error("Error saving workout:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example backend route to fetch saved workouts for a user
router.get("/savedWorkouts", authenticateToken, async (req, res) => {
  try {
    // Retrieve the user ID from the authenticated token
    const userId = req.user.userId;
    const date = req.query.date || new Date(); // Use provided date or today's date

    console.log("uid: ", userId);

    // Fetch saved workouts from the database based on the user ID
    const savedWorkouts = await fetchSavedWorkouts(userId, date);
    console.log("sw", savedWorkouts);

    // Return the data as JSON
    res.json(savedWorkouts);
    //console.log(res);
  } catch (error) {
    console.error("Error fetching saved workouts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
