const { create, GetRange, getByCategory } = require("../controllers/products");
const { body } = require("express-validator");
const router = require("express").Router();
const { validateData } = require("../helpers/validator");

router.get("/", GetRange);
router.get("/", getByCategory);
router.get(
  "/",
  body("name").isLength({ min: 3 }),
  body("price").isNumeric(),
  body("quantity").isNumeric(),
  body("categoryId").isNumeric(),
  validateData,
  create
);

module.exports = router;
