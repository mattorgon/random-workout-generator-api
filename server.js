require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/authMiddleware"); // Import the middleware
const connectDB = require("./config/mongo"); // Import the connectDB function
const cors = require("cors"); // Import the cors middleware
const path = require("path"); // Import path module
const authRoutes = require("./routes/Auth");
const savedWorkoutsRoutes = require("./routes/SavedWorkouts");
const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(
  cors({
    origin: "https://random-workout-generator-ff903ce3cfea.herokuapp.com", // Replace with your actual frontend URL
    credentials: true,
  })
);

// Parse JSON bodies
app.use(bodyParser.json());
console.log("Middlewares set...");

// Connect to MongoDB
connectDB();

// Use the middleware to protect routes
app.get("/protected-route", authenticateToken, (req, res) => {
  res.json({ message: "This route is protected" });
});

// Define routes
app.use("/auth", authRoutes);
app.use("/workouts", savedWorkoutsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Start the server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
