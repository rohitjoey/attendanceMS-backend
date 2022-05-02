const passport = require("passport");
const {
  getDepartment,
  createDepartment,
  getDepartmentByUserId,
} = require("../controllers/department.controller");

const { adminAuth } = require("../middlewares/admin-auth-route");

module.exports = (router) => {
  router
    .route("/")
    .get(
      passport.authenticate("jwt", { session: false }),
      adminAuth,
      getDepartment
    )
    .post(
      passport.authenticate("jwt", { session: false }),
      adminAuth,
      createDepartment
    );
  router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    getDepartmentByUserId
  );
  return router;
};
