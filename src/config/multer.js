const uuid = require("uuid").v4;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}&${originalname}`);
  },
});

exports.upload = multer({
  storage,
});
