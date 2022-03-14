const passport = require("passport");
const { getAttendances } = require("../controllers/attendance.controller");

module.exports = (router) => {
  // console.log("initial router of user", router);

  router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), getAttendances);

  // console.log("final router of user", router);
  return router;
};
