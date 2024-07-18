const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const pRouter = Router();
const {
  getPosts,

  createPost,
  deletePost,
} = require("../controllers/post.controller");

pRouter.get("/getPosts", getPosts);
pRouter.post("/createPost", isAuth, createPost);
pRouter.get("/deletePost/:id", isAuth, deletePost);

module.exports = pRouter;
