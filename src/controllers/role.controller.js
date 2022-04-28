const { Role } = require("../database/models/");

const getRole = async (req, res) => {
  const roles = await Role.findAll();
  res.status(200).json(roles);
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

module.exports = { getRole, createRole };
