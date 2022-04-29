const passport = require("passport");
const {
  getDepartment,
  createDepartment,
  getDepartmentByUserId,
} = require("../controllers/department.controller");

const { adminAuth } = require("../middlewares/admin-auth-route");

module.exports = (router) => {
  router.route("/").get(getDepartment).post(adminAuth, createDepartment);
  router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    getDepartmentByUserId
  );
  return router;
};
