const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const { getOtherUser, getUserPosts } = require("../controllers/otherUser.controller");
const ouRouter = Router();

ouRouter.get("/getUser/:id", isAuth, getOtherUser);
ouRouter.get("/getUserPosts/:id", isAuth, getUserPosts);

module.exports = ouRouter;
