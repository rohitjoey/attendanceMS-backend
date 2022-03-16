const passport = require("passport");
const {
  getAllUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  protectedRoute,
} = require("../controllers/users.controller");

module.exports = (router) => {
  // console.log("initial router of user", router);
  router.get("/", getAllUsers);
  router.post("/register", createUser);
  router
    .route("/protected")
    .get(passport.authenticate("jwt", { session: false }), protectedRoute);
  router.route("/:id").patch(updateUser).delete(deleteUser);

  router.post("/login", loginUser);
  // console.log("final router of user", router);
  return router;
};
