const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: false },
  duration: { type: Number, required: false },
  //can add more fields as needed
});

const workoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  exercises: [exerciseSchema],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
