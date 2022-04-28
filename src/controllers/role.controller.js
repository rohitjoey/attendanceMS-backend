const { Role } = require("../database/models/");

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
    userRole = await user.getRole();
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

module.exports = { getRole, createRole, getRoleByUserId };
