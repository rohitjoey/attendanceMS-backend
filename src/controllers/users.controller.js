const { User } = require("../database/models");
const { validatePassword, generatePassword } = require("../utils/passwordUtil");
const { generateJWT } = require("../utils/jwtUtil");
const passport = require("passport");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await generatePassword(password);
  const user = await User.create({
    username: username,
    password: hashedPassword,
  });
  const tokenObject = generateJWT(user);
  req.locals.tokenObject = tokenObject;
  // res.status(200).json({
  //   success: true,
  //   user: user,
  //   token: tokenObject.token,
  //   expiresIn: tokenObject.expiresIn,
  // });
  // console.log(req);
  res.redirect("/api/user/login");
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const name = username.trim().toLowerCase();
  const user = await User.findOne({ where: { username: name } });
  if (!user) {
    return res.status(401).json("Cannot find user");
  }
  const isValid = await validatePassword(password, user.password);
  if (!isValid) {
    return res.status(400).json("Wrong password");
  }

  // res.status(400).json("Welcome");

  const tokenObject = generateJWT(user);
  // res.status(200).json({
  //   success: true,
  //   user: user,
  //   token: tokenObject.token,
  //   expiresIn: tokenObject.expiresIn,
  // });

  req.locals.tokenObject = tokenObject;
  res.redirect("/api/attendance");
};

// const getUser = async (req, res) => {
//   const { id: userId } = req.params;
//   const user = await User.findOne({ where: { id: userId } });

//   if (!user) {
//     return res.status(404).json(`No user with id : ${userId}`);
//   }
//   res.status(200).json({ user });
// };
const updateUser = async (req, res) => {
  //Update user route
};

const protectedRoute = async (req, res) => {
  res.json("WELCOME TO");
};
const deleteUser = async (req, res) => {
  // Delete user route
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  protectedRoute,
  updateUser,
  deleteUser,
};
