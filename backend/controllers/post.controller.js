const postModel = require("../models/post.model");
const { extractPublicId, deleteImageByUrl } = require("../public/javascripts/image_functions");

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find({}).populate("user", "username image");
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const { disc, image } = req.body;
  const image_Id = extractPublicId(image);
  try {
    if (!image || !disc) return res.status(422).json({ message: "Fill all the inputs" });

    const user = req.user._id;
    await postModel.create({ disc, image, user, image_Id });
    return res.status(201).json({ message: "Post Created Successfully" });
  } catch (error) {
    if (image_Id) deleteImageByUrl(image_Id);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postModel.findById(id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    const publicId = post.image_Id;

    // Delete post and image
    await postModel.findByIdAndDelete(id);
    await deleteImageByUrl(`posts/${publicId}`, res);

    return res.status(200).json({ message: "Post and image deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, deletePost, getPosts };
