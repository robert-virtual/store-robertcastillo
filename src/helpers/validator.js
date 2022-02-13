const { validationResult } = require("express-validator");

function validateData(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors, body: req.body, req });
  }
  next();
}

module.exports = {
  validateData,
};
