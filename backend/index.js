const express = require("express");
const app = express();
const db = require("./config/database");
PORT = process.env.PORT || 5000;

const cors = require("cors");
const cookieParser = require("cookie-parser");
const uRouter = require("./routers/user.router");
const pRouter = require("./routers/post.router");
const ouRouter = require("./routers/otherUser.router");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", uRouter);
app.use("/post", pRouter);
app.use("/oUser", ouRouter);

app.listen(PORT, () => {
  db();
  console.log("server stated on http://localhost:" + PORT);
});
