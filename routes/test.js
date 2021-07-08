const express = require("express");
const { Role, User, Detail, Product, Item } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Role.findAll({
      include: {
        model: User,
        as: "users",
        include: [
          {
            model: Product,
            as: "product",
            include: [{ model: Item, as: "item" }],
          },
          {
            model: Detail,
            as: "detail",
          },
        ],
      },
    });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
