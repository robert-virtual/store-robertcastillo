const { validationResult } = require("express-validator");

function validateData(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors });
  }
  next();
}

module.exports = {
  validateData,
};
