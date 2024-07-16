const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  disc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: true,
  },
});

const postModel = mongoose.model("POST", postSchema);

module.exports = postModel;
