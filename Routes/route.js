const express = require("express");
const { Role, Users } = require("../models");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const data = await Users.create({ username, email, password });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
