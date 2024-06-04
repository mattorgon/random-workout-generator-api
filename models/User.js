const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  bodySegments: {
    type: Map,
    of: Number,
    default: {},
  },
});

// Hash the user's password before saving to the database
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
