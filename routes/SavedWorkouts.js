const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const User = require("../models/User");

// POST endpoint to save workout data
router.post("/saveWorkout", async (req, res) => {
  try {
    const { userId, savedExercises } = req.body;

    // Step 2: Query the User model to get the user with the given username
    // const user = await User.findOne({ username: userId });
    // console.log("user obj: ", user);

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    // // Step 3: Extract the userId from the retrieved user
    // console.log("user obj: ", user);
    // const USERID = user._id;

    // Assuming you have a User model with a _id field
    // You can adjust the query based on your actual User model structure
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

module.exports = router;
