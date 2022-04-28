const passport = require("passport");
const { getRole, createRole } = require("../controllers/role.controller");

module.exports = (router) => {
  router.route("/").get(getRole).post(createRole);
  return router;
};
