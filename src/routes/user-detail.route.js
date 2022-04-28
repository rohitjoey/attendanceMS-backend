const {
  getUserDetail,
  createUserDetail,
} = require("../controllers/userdetail.controller");

const passport = require("passport");

// const userDetailRoute =

module.exports = (router) => {
  //   console.log("userdetail", router);
  router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), getUserDetail)
    .post(createUserDetail);
  // router.post("/", createUserDetail);
  //   console.log("fffuserdetail", router);
  return router;
};
