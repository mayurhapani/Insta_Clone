const express = require("express");
const app = express();
const db = require("./config/database");

const uRouter = require("./routers/user.router");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/", uRouter);

app.listen(process.env.PORT || 0, () => {
  db();
  console.log("server stated on http://localhost:" + process.env.PORT);
});
