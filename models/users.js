const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      reqired: true,
    },
    last_name: {
      type: String,
      reqired: true,
    },
    email: {
      type: String,
      reqired: true,
      unique: true,
    },
    gender: {
      type: String,
      reqired: true,
    },

    job_title: {
      type: String,
      reqired: true,
    },
  },
  {
    timestamps: true,
  },
);

// user model
const User = mongoose.model("user", userSchema);

module.exports = {
  User,
};
