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
  router.route("/").get(getAllUsers);
  router
    .route("/register")
    .get((req, res, next) => {
      const form =
        '<h1>Register Page</h1><form method="post" action="/api/user/register">\
                      Enter Username:<br><input type="text" name="username">\
                      <br>Enter Password:<br><input type="password" name="password">\
                      <br><br><input type="submit" value="Submit"></form>';

      res.send(form);
    })
    .post(createUser);
  router
    .route("/protected")
    .get(passport.authenticate("jwt", { session: false }), protectedRoute);
  router.route("/:id").patch(updateUser).delete(deleteUser);

  router
    .route("/login")
    .get((req, res, next) => {
      const form =
        '<h1>Login Page</h1><form method="POST" action="/api/user/login">\
      Enter Username:<br><input type="text" name="username">\
      <br>Enter Password:<br><input type="password" name="password">\
      <br><br><input type="submit" value="Submit"></form>';

      res.send(form);
    })
    .post(loginUser);
  // console.log("final router of user", router);
  return router;
};
