const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    const token =req.cookies.jwt || req.header("Authorization").replace("Bearer ", "");

    if (!token || token.trim() === "") {
      return res.status(401).json({
        message: "Token is missing",
      });
    }

    const { mail } = req.query;
    await jwt.verify(token, process.env.SECRETKEY, (err, decode) => {
      if (err) {
        return res.status(400).json({
          message: "Token is expired or invalid",
        });
      }
      const decodedEmail = decode.email;
      if (mail == decodedEmail) {
        next();
      } else {
        return res.status(401).json({
          message: "Invalid user",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { authenticate };
