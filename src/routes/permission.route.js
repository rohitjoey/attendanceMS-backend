const passport = require("passport");
const {
  getPermission,
  createPermission,
  getPermissionByUserId,
  assignPermission,
} = require("../controllers/permission.controller");

const { adminAuth } = require("../middlewares/permission-auth-route");

module.exports = (router) => {
  router
    .route("/")
    .get(
      passport.authenticate("jwt", { session: false }),
      adminAuth,
      getPermission
    )
    .post(
      passport.authenticate("jwt", { session: false }),
      adminAuth,
      createPermission
    );
  //   router.get(
  //     "/:id",
  //     passport.authenticate("jwt", { session: false }),
  //     getPermissionByUserId
  //   );

  router.post(
    "/assign",
    passport.authenticate("jwt", { session: false }),
    adminAuth,
    assignPermission
  );

  return router;
};
