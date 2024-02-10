// utils/database.js
const Workout = require("../models/workoutModel");

const fetchSavedWorkouts = async (userId) => {
  try {
    const savedWorkouts = await Workout.find({ user: userId });
    return savedWorkouts;
  } catch (error) {
    console.error("Error fetching saved workouts:", error);
    throw error;
  }
};

module.exports = { fetchSavedWorkouts };
