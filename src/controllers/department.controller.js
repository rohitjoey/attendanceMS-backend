const { Department } = require("../database/models/");

const getDepartment = async (req, res) => {
  const departments = await Department.findAll();
  res.status(200).json(departments);
};

const createDepartment = async (req, res) => {
  const { name, hod } = req.body;

  await Department.create({
    name,
    hod,
  });

  res.status(200).json({
    msg: "Success",
  });
};

const getDepartmentByUserId = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const { id: user_id } = user.toJSON();
  //   console.log(typeof parseInt(userId));
  const userId = parseInt(id);
  //   console.log(typeof user_id);
  //   console.log(typeof userId);
  if (userId === user_id) {
    userDepartment = await user.getDepartment();
    res.status(200).json({ userDepartment });
  } else {
    res.status(500).json({ msg: "Requester id donot match" });
  }
};

module.exports = { getDepartment, createDepartment, getDepartmentByUserId };
