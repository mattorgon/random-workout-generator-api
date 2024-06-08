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

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
});

// Enable CORS for all routes
app.use(
  cors({
    origin: [
      "https://random-workout-generator-ff903ce3cfea.herokuapp.com",
      "https://ipickulift.com", // Custom domain
      "https://www.ipickulift.com", // Custom domain with www // Replace with your actual frontend URL
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors()); // Handle preflight requests

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
