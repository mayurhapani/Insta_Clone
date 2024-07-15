const { Router } = require("express");
const { signup } = require("../controllers/user.controller");
const uRouter = Router();

uRouter.get("/", (req, res) => {
  res.send("hi");
});
uRouter.post("/signup", signup);

module.exports = uRouter;
