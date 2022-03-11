const { User } = require("../database/models");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.create({ username, password });
  res.status(200).json(user);
};

module.exports = { getAllUsers, createUser };
