const { Router } = require("express");
const { signup, login } = require("../controllers/user.controller");
const uRouter = Router();

uRouter.get("/", (req, res) => {
  res.send("hi");
});
uRouter.post("/signup", signup);
uRouter.post("/signin", login);

module.exports = uRouter;
