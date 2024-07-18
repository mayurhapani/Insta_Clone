const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const uRouter = Router();
const { signup, login, getUser } = require("../controllers/user.controller");

uRouter.post("/signup", signup);
uRouter.post("/signin", login);
uRouter.get("/getUser", isAuth, getUser);

module.exports = uRouter;
