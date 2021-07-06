const express = require("express");
const { Role, User } = require("../models");
const router = express.Router();
const { body } = require("express-validator");
const jwtVerify = require("../middleware/jwtVerify");
const { validate, rules } = require("../middleware/validation");

router.post("/signup", rules(), validate, async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    const role = await Role.findByPk(2);
    await role.createUser({
      fullname,
      username,
      email,
      password,
    });
    res.status(200).json({ msg: "account registered successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Error" });
  }
});

//
// Role.findAll({
//   include: { model: User, as: "user" },
// }).then((role) => {
//   res.json(role);
// });
router.post("/login", rules(), validate, async (req, res) => {
  const { email, password } = req.body;
  const dataDB = await User.findAll({ where: { email: email } });
  try {
    const data = await User.auth(password, dataDB[0].password, dataDB);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({ msg: "email, password or both are invalid" });
  }
});
// router.get("/profile/:username", jwtVerify, async (req, res) => {
//   let userParams = req.params.username;
//   const data = await Users.findAll({
//     where: { username: userParams },
//     attributes: { exclude: ["password"] },
//   });

//   res.json({ data: data });
// });

module.exports = router;
