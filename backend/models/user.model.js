const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/instaclone21/image/upload/v1721210287/users/u0qrfanxqztl61j37odp.png",
  },
});

const userModel = mongoose.model("USER", userSchema);

module.exports = userModel;
