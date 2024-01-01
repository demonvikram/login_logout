const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const loginModel = require("../models/loginModel");
const User = require("../models/user");

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const user = await User.findOne({ email: mail });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const loginDetails = await loginModel.findOne({ email: mail });

    if (loginDetails) {
      await loginModel.findOneAndUpdate(
        { email: mail },
        {
          login: true,
          LogInDateAndTime: Date.now(),
          LogOutDateAndTime: null,
        }
      );
    } else {
      const loginDetails = new loginModel({
        email: mail,
        login: true,
        user: user._id,
      });

      await loginDetails.save();
    }

    const payload = {
      username: user.username,
      email: mail,
    };

    const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: "1h" });

    return res
      .status(200)
      .cookie("jwt", token, { httpOnly: true })
      .json({
        message: "Logged in successfully",
      });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    const { mail } = req.body;
    const loggedOut = await loginModel.findOneAndUpdate(
      { email: mail },
      {
        login: false,
        LogOutDateAndTime: Date.now(),
      }
    );

    if (!loggedOut) {
      return res.status(404).json({
        message: "Failed to logout as user does not exist",
      });
    }

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { login, logout };

