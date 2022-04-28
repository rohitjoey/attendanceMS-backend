const { User_detail } = require("../database/models");

const getUserDetail = async (req, res) => {
  const user = req.user;
  // console.log(user.toJSON());
  const userDetail = await user.getUser_detail();
  res.status(200).json({ userDetail });
};

const createUserDetail = async (req, res) => {
  const detailObject = req.body;
  console.log(detailObject);
  const userDetail = await User_detail.create(detailObject);
  res.status(200).json({
    success: true,
    userDetail: userDetail,
  });
};

module.exports = { getUserDetail, createUserDetail };
