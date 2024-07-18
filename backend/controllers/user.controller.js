const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { extractPublicId, deleteImageByUrl } = require("../public/javascripts/image_functions");

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(422).json({ message: "Invalid input" });
    }

    const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({ token, message: "Login Successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = req.user;
    // console.log(user);
    return res.status(200).json({ user, message: "Welcome to profile" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login, getUser };
