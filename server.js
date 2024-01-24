const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { authenticateToken } = require("./middleware/authMiddleware"); // Import the middleware
const { connectDB } = require("./config/mongo"); // Import the connectDB function
const cors = require("cors"); // Import the cors middleware
const authRoutes = require("./routes/auth");
const app = express();
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
