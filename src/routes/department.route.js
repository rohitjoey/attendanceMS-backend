const passport = require("passport");
const {
  getDepartment,
  createDepartment,
  getDepartmentByUserId,
  assignDepartment,
} = require("../controllers/department.controller");

const { adminAuth } = require("../middlewares/permission-auth-route");

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

  router.post("/assign", assignDepartment);

  return router;
};
