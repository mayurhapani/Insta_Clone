const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const uRouter = Router();
const {
  signup,
  login,
  getUser,
  logout,
  follow,
  unfollow,
} = require("../controllers/user.controller");

uRouter.post("/signup", signup);
uRouter.post("/signin", login);
uRouter.get("/getUser", isAuth, getUser);
uRouter.get("/logout", isAuth, logout);

uRouter.put("/follow/:id", isAuth, follow);
uRouter.put("/unfollow/:id", isAuth, unfollow);

module.exports = uRouter;
