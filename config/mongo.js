// const { MongoClient } = require("mongodb");
// const config = require("config");
// const uri = config.get("mongoURI");
// let _db;

// const connectDB = async () => {
//   try {
//     let mongodb = await MongoClient.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     _db = mongodb.db("workoutsDB"); // Change the database name to your desired name
//     console.log("Mongo DB ready...");
//   } catch (error) {
//     console.log(error);
//   }
// };

// const db = () => {
//   return _db;
// };

// const close = () => {
//   _db.close();
// };

// module.exports = {
//   connectDB,
//   db,
//   close,
// };

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Mongo DB ready...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectDB;
