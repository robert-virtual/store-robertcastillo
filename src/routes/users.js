const router = require("express").Router();
const { body } = require("express-validator");
const { create, me } = require("../controllers/users");
const { validateData } = require("../helpers/validator");
const auth = require("../middlewares/auth");

router.get("/me", auth, me);

// crear usuario
router.post(
  "/",
  body("name").isLength({ min: 3 }),
  body("email").isEmail(),
  body("password").isLength({ min: 8 }),
  validateData,
  create
);

module.exports = router;
