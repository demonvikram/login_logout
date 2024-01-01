const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  login: {
    type: Boolean,
    default: true,
  },

  LogInDateAndTime: {
    type: Date,
    default: Date.now,
  },

  LogOutDateAndTime: {
    type: Date,
    default: null,
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;
