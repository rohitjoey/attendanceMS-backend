const { User, Role, Permission } = require("../database/models");

const adminAuth = async (req, res, next) => {
  const user = req.user;
  const { username } = user.toJSON();
  const user_detail = await user.getUser_detail();

  // console.log(user_detail.toJSON());
  const name = username.trim().toLowerCase();
  req.name = name;
  req.departmentId = user_detail.toJSON().department_id;
  // console.log(name);

  const role = await user_detail.getRole();
  if (!role) {
    return res.status(401).json({ success: "false", message: "Unauthorized" });
  }
  const permission = await role.getPermissions();
  if (!permission) {
    return res.status(401).json({ success: "false", message: "Unauthorized" });
  }
  let permisionArray = [];
  permission.forEach((element) => {
    permisionArray.push(element.toJSON().permission_code);
  });
  req.permissions = permisionArray;

  next();

  //   const userDetail = await user.getUser_detail();
  //   next();
};

module.exports = { adminAuth };
