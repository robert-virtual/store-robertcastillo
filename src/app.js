const express = require("express");
const app = express();
if (process.env.NODE_ENV == "development") {
  const morgan = require("morgan");
  require("dotenv").config();
  app.use(morgan("dev"));
}
const cors = require("cors");
const port = process.env.PORT || 3030;
//middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use(express.static("uploads"));
// routes
app.use("/api/products", require("./routes/products"));
app.use("/api/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
