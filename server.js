const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/authMiddleware"); // Import the middleware
const connectDB = require("./config/mongo"); // Import the connectDB function
const cors = require("cors"); // Import the cors middleware
const authRoutes = require("./routes/Auth");
const savedWorkoutsRoutes = require("./routes/SavedWorkouts");
const app = express();
const PORT = process.env.PORT || 3001;

//generate secret
// const crypto = require("crypto");
// const secretKey = crypto.randomBytes(32).toString("hex");
// console.log("secret: ", secretKey);

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

// mongoose.connect("mongodb://localhost:27017/workoutsDB", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Connect to MongoDB
connectDB();

// Use the middleware to protect routes
app.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "This route is protected" });
});

app.use("/auth", authRoutes);
app.use("/workouts", savedWorkoutsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
