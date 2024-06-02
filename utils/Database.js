// utils/database.js
const Workout = require("../models/workoutModel");

const fetchSavedWorkouts = async (userId, date) => {
  try {
    // const startOfDay = new Date(date);
    // startOfDay.setDate(date.getDate() - 3);
    // startOfDay.setHours(0, 0, 0, 0);

    // const endOfDay = new Date(date);
    // endOfDay.setDate(date.getDate() + 3);
    // endOfDay.setHours(23, 59, 59, 999);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const savedWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lte: endOfDay },
    });
    return savedWorkouts;
  } catch (error) {
    console.error("Error fetching saved workouts:", error);
    throw error;
  }
};

module.exports = { fetchSavedWorkouts };
