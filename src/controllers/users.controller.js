const { User } = require("../database/models");
const { validatePassword, generatePassword } = require("../utils/passwordUtil");
const { generateJWT } = require("../utils/jwtUtil");
const passport = require("passport");

const getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.json({ success: true, users });
};

const createUser = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const hashedPassword = await generatePassword(password);
  const user = await User.create({
    username: username,
    password: hashedPassword,
  });
  const tokenObject = generateJWT(user);
  // req.locals.tokenObject = tokenObject;
  res.status(200).json({
    success: true,
    user: user,
    token: tokenObject.token,
    expiresIn: tokenObject.expiresIn,
  });
  // console.log(req);
  // const token = JSON.stringify(tokenObject);
  // res.status(200).render("pages/attendance", { tokenObject: token });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const name = username.trim().toLowerCase();

  const user = await User.findOne({ where: { username: name } });
  if (!user) {
    return res.status(401).json({ msg: "Cannot find user" });
  }
  const isValid = await validatePassword(password, user.password);
  if (!isValid) {
    return res.status(400).json({ msg: "Wrong password" });
  }

  if (user.username === "admin") {
    user.admin = true;
  } else {
    user.admin = false;
  }

  // res.status(400).json("Welcome");

  const tokenObject = generateJWT(user);
  res.status(200).json({
    success: true,
    user: user,
    admin: user.admin,
    token: tokenObject.token,
    expiresIn: tokenObject.expiresIn,
  });
  // const token = JSON.stringify(tokenObject);
  // res.status(200).render("pages/attendance", { tokenObject: token });
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
