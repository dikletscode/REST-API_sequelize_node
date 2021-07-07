const express = require("express");
const { Role, User, Detail } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Role.findAll({
      include: {
        model: User,
        as: "user",
        include: {
          model: Detail,
          as: "detail",
        },
      },
    });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
