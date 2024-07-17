const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const uRouter = Router();
const { signup, login } = require("../controllers/user.controller");

uRouter.post("/signup", signup);
uRouter.post("/signin", login);

module.exports = uRouter;
