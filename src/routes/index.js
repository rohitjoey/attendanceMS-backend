const express = require("express");
// const Urouter = express.Router();
// const UdRouter = express.Router();

const userDetailRoute = require("./user-detail.route")(express.Router());
const userRoute = require("./users.route")(express.Router());

module.exports = {
  userRoute,
  userDetailRoute,
};
