const { create, GetRange, getByCategory } = require("../controllers/products");
const { body } = require("express-validator");
const router = require("express").Router();
const { validateData } = require("../helpers/validator");
const auth = require("../middlewares/auth");
const { upload } = require("../config/multer");

router.get("/range", GetRange);
router.get("/bycategory", getByCategory);

// crear producto
router.post(
  "/",
  auth,
  upload.single("images"),
  body("name").isLength({ min: 3 }),
  body("price").isNumeric(),
  body("quantity").isInt({ min: 1 }),
  body("categoryId").isInt({ min: 1 }),
  validateData,
  create
);

module.exports = router;
