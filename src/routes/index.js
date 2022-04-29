const express = require("express");
// const Urouter = express.Router();
// const UdRouter = express.Router();

const userDetailRoute = require("./user-detail.route")(express.Router());
const userRoute = require("./users.route")(express.Router());
const attendanceRoute = require("./attendance.route")(express.Router());
const roleRoute = require("./role.route")(express.Router());
const departmentRoute = require("./department.route")(express.Router());

module.exports = {
  userRoute,
  userDetailRoute,
  attendanceRoute,
  roleRoute,
  departmentRoute,
};
