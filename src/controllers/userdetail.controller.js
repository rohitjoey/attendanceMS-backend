const { User_detail } = require("../database/models");

const getAllUserDetail = async (req, res) => {
  const userDetail = await User_detail.findAll();
  res.json(userDetail);
};

module.exports = { getAllUserDetail };
