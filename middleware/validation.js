const { body, validationResult } = require("express-validator");

const rules = () => {
  return [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 6, max: 50 }),
  ];
};

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (error.isEmpty()) {
    return next();
  }
  return res.status(422).json({
    //422 Unprocessable Entity
    error: "invalid Input Values",
  });
};

module.exports = {
  validate,
  rules,
};
