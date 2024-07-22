const { Router } = require("express");
const { isAuth } = require("../middlewares/isAuth.middleware");
const pRouter = Router();
const {
  getPosts,
  getMyPost,
  createPost,
  deletePost,
  likePost,
  addComment,
  deleteComment,
} = require("../controllers/post.controller");

pRouter.get("/getPosts", isAuth, getPosts);
pRouter.get("/getMyPosts/:id", isAuth, getMyPost);

pRouter.post("/createPost", isAuth, createPost);
pRouter.delete("/deletePost/:id", isAuth, deletePost);

pRouter.get("/like/:id", isAuth, likePost);
pRouter.post("/addComment/:id", isAuth, addComment);
pRouter.delete("/deleteComment", isAuth, deleteComment);

module.exports = pRouter;
