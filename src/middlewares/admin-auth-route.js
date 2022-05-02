const adminAuth = async (req, res, next) => {
  const user = req.user;
  const { username } = user.toJSON();
  //   console.log(username);
  const name = username.trim().toLowerCase();
  if (name === "admin") {
    next();
  } else {
    return res
      .status(401)
      .json({ success: "false", message: "Unauthorized, Not Admin" });
  }
  //   const userDetail = await user.getUser_detail();
  //   next();
};

module.exports = { adminAuth };
