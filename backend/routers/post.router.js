const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const pRouter = Router();
const {
  getPosts,
  createPost,
  deletePost,
  likePost,
  addComment,
} = require("../controllers/post.controller");

pRouter.get("/getPosts", getPosts);

pRouter.post("/createPost", isAuth, createPost);
pRouter.get("/deletePost/:id", isAuth, deletePost);

pRouter.get("/like/:id", isAuth, likePost);
pRouter.post("/addComment/:id", isAuth, addComment);

module.exports = pRouter;
