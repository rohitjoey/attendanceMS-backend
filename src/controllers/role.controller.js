const { Role, User_detail } = require("../database/models/");

const getRole = async (req, res) => {
  const roles = await Role.findAll();
  res.status(200).json(roles);
};

const getRoleByUserId = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { id: user_id } = user.toJSON();
  //   console.log(typeof parseInt(userId));
  const userId = parseInt(id);
  //   console.log(typeof user_id);
  //   console.log(typeof userId);
  if (userId === user_id) {
    const userDetail = await user.getUser_detail();
    const userRole = await Role.findOne({ where: { id: userDetail.role_id } });
    res.status(200).json({ userRole });
  } else {
    res.status(500).json({ msg: "Requester id donot match" });
  }
};

const createRole = async (req, res) => {
  const { title, role_code, user_id } = req.body;

  await Role.create({
    title,
    role_code,
    user_id,
  });

  res.status(200).json({
    msg: "Success",
  });
};

const assignRole = async (req, res) => {
  const { userId, assignedId } = req.body;

  const user = await User_detail.findOne({ where: { user_id: userId } });
  const role = await Role.findOne({ where: { id: assignedId } });

  // console.log(user, role);
  await role.addUser_detail(user);
  res.json({ success: "true" });
};

module.exports = { getRole, assignRole, createRole, getRoleByUserId };
