const { Department, User_detail } = require("../database/models/");

const getDepartment = async (req, res) => {
  const { name } = req;
  // let department
  if (name !== "admin") {
    return res.status(401).json({ msg: "The user has no permission" });
  }
  const departments = await Department.findAll();
  res.json({ success: true, departments });
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
    const userDetail = await user.getUser_detail();
    const userDepartment = await Department.findOne({
      where: { id: userDetail.department_id },
    });

    res.status(200).json({ userDepartment });
  } else {
    res.status(500).json({ msg: "Requester id donot match" });
  }
};

const assignDepartment = async (req, res) => {
  const { userId, assignedId } = req.body;
  // console.log(userId, assignedId);

  const user = await User_detail.findOne({ where: { user_id: userId } });
  // console.log(user);
  if (!user) {
    return res.json({ status: "No user found" });
  }
  const department = await Department.findOne({ where: { id: assignedId } });
  if (!department) {
    return res.json({ status: "No department found" });
  }
  await department.addUser_detail(user);
  // console.log(user, department);
  res.json({ status: "Success" });
};

module.exports = {
  getDepartment,
  createDepartment,
  getDepartmentByUserId,
  assignDepartment,
};
