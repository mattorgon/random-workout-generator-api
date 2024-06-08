const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUri = process.env.MONGO_URI;
  console.log(`Connecting to database at ${dbUri}`);
  console.log("Mongo URI:", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Adjust the timeout as needed
    });
    console.log("MongoDB ready...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
