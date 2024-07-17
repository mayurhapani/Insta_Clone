const express = require("express");
const app = express();
const db = require("./config/database");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const uRouter = require("./routers/user.router");
const pRouter = require("./routers/post.router");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", uRouter);
app.use("/post", pRouter);

app.listen(process.env.PORT || 0, () => {
  db();
  console.log("server stated on http://localhost:" + process.env.PORT);
});
