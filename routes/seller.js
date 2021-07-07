const express = require("express");
const { Role, User, Detail, Globalproduct } = require("../models");
const router = express.Router();
const { validate, rules } = require("../middleware/validation");
const jwtVerify = require("../middleware/jwtVerify");

router.get("/register/:uuid", async (req, res) => {
  let id = req.params.uuid;
  //   let data = await User.findOne({
  //     raw: true,
  //     where: { id: id },
  //     attributes: ["roleId"],
  //   });
  try {
    let data = await User.findOne({ where: { id: id } }).then(async (obj) => {
      let datas = await obj.getDetail({ raw: true });
      if (
        datas.address == null &&
        datas.notelp == null &&
        datas.images == null
      ) {
        res.json({ isAdmin: false });
      } else {
        obj.update({ roleId: 1 });
        res.send({ isAdmin: true });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
