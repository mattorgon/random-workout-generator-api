const express = require("express");
const router = express.Router();
const Workout = require("../models/workoutModel");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/authMiddleware");
const { fetchSavedWorkouts } = require("../utils/Database");

const allSegments = {
  Back: 0,
  Biceps: 0,
  Chest: 0,
  Legs: 0,
  Shoulders: 0,
  Triceps: 0,
  Core: 0,
  Cardio: 0,
  // Add any other segments as needed
};

// POST endpoint to save workout data
router.post("/saveWorkout", async (req, res) => {
  try {
    const { userId, savedExercises } = req.body;
    console.log("endpoint hit, req: ", req.body);
    console.log("saved exercises: ", savedExercises);
    const userWorkout = new Workout({
      user: userId, // Use the user's _id here
      date: new Date(),
      exercises: savedExercises.map((exercise) => ({
        name: exercise.name,
        category: exercise.segment,
      })),
    });

    const savedWorkout = await userWorkout.save();

    // Group exercises by category (segment)
    const segmentCounts = savedExercises.reduce((acc, exercise) => {
      acc[exercise.segment] = (acc[exercise.segment] || 0) + 1;
      return acc;
    }, {});

    // Update user's bodySegments data
    const user = await User.findById(userId);

    for (const [segment, count] of Object.entries(segmentCounts)) {
      user.bodySegments.set(
        segment,
        (user.bodySegments.get(segment) || 0) + count
      );
    }

    await user.save();

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

router.get(
  "/users/:userId/bodySegments",
  authenticateToken,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Merge existing segments with default segments
      const mergedSegments = {
        ...allSegments,
        ...Object.fromEntries(user.bodySegments),
      };

      res.status(200).json(mergedSegments);
    } catch (error) {
      console.error("Error fetching body segments:", error);
      res.status(500).send("Failed to fetch body segments");
    }
  }
);

module.exports = router;
