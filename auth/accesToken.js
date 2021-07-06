const jwt = require("jsonwebtoken");
require("dotenv").config();

const accessToken = (user) => {
  return jwt.sign({ user_id: user.id }, process.env.SECRET, {
    expiresIn: "2m",
  });
};

module.exports = accessToken;
