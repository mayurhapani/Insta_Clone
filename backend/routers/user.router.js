const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const uRouter = Router();
const { signup, login, createPostPage, createPost } = require("../controllers/user.controller");

uRouter.post("/signup", signup);
uRouter.post("/signin", login);
uRouter.get("/createPost", isAuth, createPostPage);
uRouter.post("/createPost", isAuth, createPost);

module.exports = uRouter;
