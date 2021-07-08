const express = require("express");
const { Role, User, Detail, Product, Item } = require("../models");
const router = express.Router();
const { validate, rules } = require("../middleware/validation");
const jwtVerify = require("../middleware/jwtVerify");

router.post("/register/:uuid", async (req, res) => {
  let id = req.params.uuid;
  const { agree } = req.body;

  try {
    await User.findOne({ where: { id: id } }).then(async (role) => {
      let detail = await role.getDetail();
      if (
        detail.address != null &&
        detail.notelp != null &&
        detail.images != null &&
        agree == true
      ) {
        role.update({ roleId: 1 });
        res.json({ isAdmin: true });
      } else if (agree == true) {
        res.json({
          msg: "to continue this process. Please complete your information!",
        });
      } else {
        res.json({ isAdmin: false });
      }
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.patch("/add/:uuid", async (req, res) => {
  let id = req.params.uuid;
  const { nameProduct, price, description, total, images } = req.body;

  try {
    await Product.findOne({ where: { userId: id } }).then(async (product) => {
      let data = await product.createItem({
        nameProduct,
        price,
        description,
        total,
        images,
      });
      res.send(data);
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
