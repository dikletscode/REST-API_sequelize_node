const express = require("express");
const app = express();
const { sequelize } = require("./models");
const auth = require("./routes/auth");
const seller = require("./routes/seller");
const testAllData = require("./routes/test");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", auth);
app.use("/store", seller);
app.use("/test", testAllData);

app.listen(3000, "localhost", async (err) => {
  if (err) console.log(err.message);
  await sequelize.authenticate();
  console.log("http://localhost:3000");
});
