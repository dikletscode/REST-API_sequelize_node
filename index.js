const express = require("express");
const app = express();
const { sequelize } = require("./models");
const router = require("./Routes/route");
const testAllData = require("./Routes/test");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

app.use("/test", testAllData);

app.listen(3000, "localhost", async (err) => {
  if (err) console.log(err.message);
  await sequelize.authenticate();
  console.log("http://localhost:3000");
});
