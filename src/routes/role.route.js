const passport = require("passport");
const {
  getRole,
  createRole,
  getRoleByUserId,
} = require("../controllers/role.controller");

module.exports = (router) => {
  router.route("/").get(getRole).post(createRole);
  router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    getRoleByUserId
  );
  return router;
};
