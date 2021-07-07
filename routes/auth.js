const express = require("express");
const { Role, User, Detail, Globalproduct } = require("../models");
const router = express.Router();
const { validate, rules } = require("../middleware/validation");
const jwtVerify = require("../middleware/jwtVerify");

router.get("/", async (req, res) => {
  try {
    let data = await Globalproduct.findAll();
    res.json({ data: data });
  } catch (error) {
    res.json({ msg: "error" });
  }
});

router.post("/signup", rules(), validate, async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    const role = await Role.findByPk(2);
    await role
      .createUser({
        fullname,
        username,
        email,
        password,
      })
      .then((user) => {
        user.createDetail({});
      });
    res.json({ msg: "success" });
  } catch (error) {
    res.json({ msg: "Error" });
  }
});

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

router.patch("/profile/:uuid", jwtVerify, async (req, res) => {
  let userParams = req.params.uuid;
  const { address, notelp, images } = req.body;

  try {
    await Detail.upsert({ address, notelp, images }, { userId: userParams });
    res.send("edit success");
  } catch (error) {
    console.log(error);
    res.send("an error occurred while updating the data");
  }
});

module.exports = router;
