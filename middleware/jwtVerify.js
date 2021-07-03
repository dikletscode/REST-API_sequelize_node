const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerify = (req, res, next) => {
  const headers = req.headers;
  console.log(headers);
  const auth = headers.authorization;

  if (auth) {
    const token = auth && auth.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, response) => {
      if (err) {
        return res.status(403).send("Forbidden");
      }
      req.response = response;
      next();
    });
  } else {
    res.status(401).send("u can't access,not authenticated");
  }
};
module.exports = jwtVerify;
