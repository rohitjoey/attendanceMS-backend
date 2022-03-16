const passport = require("passport");
const {
  getAttendances,
  clockIn,
  clockOut,
} = require("../controllers/attendance.controller");

module.exports = (router) => {
  // console.log("initial router of user", router);

  router
    .route("/")
    .get(passport.authenticate("jwt", { session: false }), getAttendances);
  router.post(
    "/clockin",
    passport.authenticate("jwt", { session: false }),
    clockIn
  );
  router.patch(
    "/clockout/:id",
    passport.authenticate("jwt", { session: false }),
    clockOut
  );
  // console.log("final router of user", router);
  return router;
};
