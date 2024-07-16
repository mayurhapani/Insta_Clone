const { Router } = require("express");
const { signup, login, createPostPage } = require("../controllers/user.controller");
const { isAuth } = require("../middlewares/isAuth.middleware");
const uRouter = Router();

uRouter.post("/signup", signup);
uRouter.post("/signin", login);
uRouter.get("/createPost", isAuth, createPostPage);

module.exports = uRouter;
