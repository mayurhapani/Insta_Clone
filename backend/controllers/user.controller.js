const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(422).send();
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      await userModel.create({
        name,
        username,
        email,
        password: hash,
      });
      return res.status(201).json({ message: "User created successfully!" });
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { signup };
