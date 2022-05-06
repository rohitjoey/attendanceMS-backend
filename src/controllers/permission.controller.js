const { Role, Permission, User_detail } = require("../database/models/");

const getPermission = async (req, res) => {
  const permissions = await Permission.findAll();
  res.status(200).json(permissions);
};

const createPermission = async (req, res) => {
  const { title, permission_code } = req.body;

  await Permission.create({
    title,
    permission_code,
  });

  res.status(200).json({
    msg: "Success",
  });
};

// const getPermissionByUserId = async (req, res) => {
//   const user = req.user;
//   const { id } = req.params;
//   const { id: user_id } = user.toJSON();
//   //   console.log(typeof parseInt(userId));
//   const userId = parseInt(id);
//   //   console.log(typeof user_id);
//   //   console.log(typeof userId);
//   if (userId === user_id) {
//     const userDetail = await user.getUser_detail();
//     const userPermission= await Permission.findOne({
//       where: { id: userDetail.department_id },
//     });

//     res.status(200).json({ userPermission});
//   } else {
//     res.status(500).json({ msg: "Requester id donot match" });
//   }
// };

const assignPermission = async (req, res) => {
  const { role_code, permission_code } = req.body;
  console.log(permission_code, role_code);
  const role = await Role.findOne({
    where: { role_code: role_code },
  });
  const permission = await Permission.findAll({
    where: {
      permission_code: permission_code,
    },
  });
  // res.json(permission);
  role.addPermission(permission);
  res.status(200).json({ msg: "OK" });
};

module.exports = {
  getPermission,
  createPermission,
  //   getPermissionByUserId,
  assignPermission,
};
