const { create, GetRange, getByCategory } = require("../controllers/products");
const { body } = require("express-validator");
const router = require("express").Router();
const { validateData } = require("../helpers/validator");
const auth = require("../middlewares/auth");

router.get("/range", GetRange);
router.get("/bycategory", getByCategory);

// crear producto
router.post(
  "/",
  auth,
  body("name").isLength({ min: 3 }),
  body("price").isNumeric(),
  body("quantity").isInt({ min: 1 }),
  body("categoryId").isInt({ min: 1 }),
  validateData,
  create
);

module.exports = router;
