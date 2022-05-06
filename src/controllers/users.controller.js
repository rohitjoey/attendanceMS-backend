const { User, User_detail, sequelize } = require("../database/models");
const { validatePassword, generatePassword } = require("../utils/passwordUtil");
const { generateJWT } = require("../utils/jwtUtil");
const passport = require("passport");
const { checkPermission } = require("../utils/permissionCheck");

const getAllUsers = async (req, res) => {
  // console.log("adsfasdfasdf", req.name);
  // console.log("asdfad", req.permissions);

  const { name, permissions, departmentId } = req;
  // console.log(name, permissions, departmentId);
  const hasPermission = checkPermission(permissions, "vu");
  console.log(hasPermission);
  let users;
  if (name === "admin") {
    users = await User.findAll({ attributes: { exclude: ["password"] } });
  } else if (!hasPermission) {
    return res.status(401).json({ msg: "The user has no permission" });
  } else {
    users = await sequelize.query(
      `SELECT users.username,users.id FROM user_detail JOIN users ON user_detail.user_id=users.id WHERE user_detail.department_id=?`,
      {
        replacements: [`${departmentId}`],
      }
    );
    // console.log(users);
    // users = userssdf.getUser();
  }
  res.json({ success: true, users });
  // res.json("not admin");
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
