const express = require("express");
const { reset } = require("nodemon");
const { Role, Users } = require("../models");
const router = express.Router();
const jwtVerify = require("../middleware/jwtVerify");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const data = await Users.create({ username, email, password });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let data = await Users.findAll({ where: { email: email } });
  try {
    const datas = await Users.validate(password, data[0].password, data);
    res.json(datas);
  } catch (err) {
    res.status(401).json({ msg: err });
  }
});
router.get("/profile", jwtVerify, async (req, res) => {
  res.json({ msg: "login success" });
});

module.exports = router;
