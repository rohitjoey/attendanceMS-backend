const passport = require("passport");
const {
  getRole,
  createRole,
  getRoleByUserId,
} = require("../controllers/role.controller");
const { adminAuth } = require("../middlewares/admin-auth-route");

module.exports = (router) => {
  router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), adminAuth, getRole)
    .post(
      passport.authenticate("jwt", { session: false }),
      adminAuth,
      createRole
    );
  router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    getRoleByUserId
  );
  return router;
};
