const { getAllUserDetail } = require("../controllers/userdetail.controller");

// const userDetailRoute =

module.exports = (router) => {
  //   console.log("userdetail", router);
  router.use(getAllUserDetail);
  //   console.log("fffuserdetail", router);
  return router;
};
