const { getAllUsers, createUser } = require("../controllers/users.controller");

// function userRouter(router) {
//   console.log("initial router of user", router);
//   constrouter.use("/", getAllUsers);
//   console.log("final router of user", router);
//   return router;
// }
// router.route("/:id").get(getUser).patch(updateUser);
//   router.route("/").get(getAllUsers);

//   return router.name;

// console.log(router);
module.exports = (router) => {
  // console.log("initial router of user", router);
  router.route("/").get(getAllUsers).post(createUser);
  // console.log("final router of user", router);
  return router;
};
