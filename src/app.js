const express = require("express");
require("express-async-errors");
const app = express();
const passport = require("passport");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middlewares/error-handler");
const notFound = require("./middlewares/not-found");
const {
  sequelize,
  User,
  User_detail,
  Department,
  Attendance,
  Project,
  Project_User,
} = require("./database/models");
app.use(cors());

const {
  userRoute,
  userDetailRoute,
  attendanceRoute,
  roleRoute,
  departmentRoute,
} = require("./routes");

const asyncWrapper = require("./utils/asynWrapper");

require("./config/passport")(passport);

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "..", "views"));

// console.log(route);
app.use("/api/user", userRoute);
app.use("/api/userdetail", userDetailRoute);
app.use("/api/user/attendance", attendanceRoute);
app.use("/api/role", roleRoute);
app.use("/api/department", departmentRoute);

app.get("/", (req, res) => {
  res.send("Hello");
});

// // //get userdetails of an user_id
// // app.get(
// //   "/userdetail/:id",
// //   asyncWrapper(async (req, res) => {
// //     const { id: userId } = req.params;
// //     const user = await User.findOne({
// //       // include: "attendance_list",
// //       where: { id: userId },
// //     });
// //     if (!user) {
// //       res.json(`No user with id: ${userId}`);
// //     }
// //     const userDetail = await user.getUser_detail();
// //     if (!userDetail) {
// //       res.json(`No detail for user with id: ${userId}`);
// //     }
// //     // console.log(userDetail instanceof User_detail);

// //     // const userDetail = await User_detail.findAll({ include: User });
// //     // console.log(userDetail);
// //     res.status(200).json(userDetail);
// //   })
// // );

// //post user detail with user_id
// app.post(
//   "/userdetail",
//   asyncWrapper(async (req, res) => {
//     const {
//       first_name,
//       last_name,
//       gender,
//       dob,
//       contact,
//       address,
//       email,
//       user_id,
//       department_id,
//     } = req.body;

//     const user = await User.findOne({ where: { id: user_id } });
//     if (!user) {
//       res.json(`No user with id: ${user_id}`);
//     }
//     const userDetail = await User_detail.create({
//       first_name,
//       last_name,
//       gender,
//       dob,
//       contact,
//       address,
//       email,
//       user_id: user.id,
//       department_id,
//     });

//     res.status(200).json(userDetail);
//   })
// );

// //delete user
// app.delete("/user/:id", async (req, res) => {
//   const { id: userId } = req.params;
//   const user = await User.destroy({ where: { id: userId } });
//   if (!user) {
//     res.json({ msg: `No user with id: ${userId}` });
//   }
//   res.status(200).json(`User deleted successfully`);
// });

//get all departments
app.get("/department", async (req, res) => {
  const department = await Department.findAll({});
  res.status(200).json(department);
});

//create department
app.post("/department", async (req, res) => {
  const { name, hod } = req.body;
  const department = await Department.create({ name, hod });
  res.status(200).json(department);
});

// app.get("/attendance/:id", async (req, res) => {
//   const { id: userId } = req.params;
//   const user = await User.findOne({
//     // include: "attendance_list",
//     where: { id: userId },
//   });
//   if (!user) {
//     res.json(`No user with id: ${userId}`);
//   }
//   // console.log(user instanceof User);

//   // console.log(user.id);
//   const attendance = await user.getAttendances({
//     attributes: {
//       include: [
//         [
//           sequelize.fn(
//             "date_part",
//             "hour",
//             sequelize.literal("(clock_out_time - clock_in_time)")
//           ),
//           "hour",
//         ],
//         [
//           sequelize.fn(
//             "date_part",
//             "min",
//             sequelize.literal("(clock_out_time - clock_in_time)")
//           ),
//           "min",
//         ],
//         // [sequelize.literal("(hour)"), "difference"],
//         // [sequelize.literal("(clock_out_time - clock_in_time)"), "score"],
//       ],
//     },
//   });

//   attendance.forEach((attendance) => {
//     console.log(`${attendance.dataValues.hour}:${attendance.dataValues.min}`);
//   });

//   res.status(200).json({ attendance, no: attendance.length });

//   // const attendance = await Attendance.findAll({
//   //   attributes: {
//   //     include: [
//   //       [
//   //         sequelize.fn(
//   //           "date_part",
//   //           "hour",
//   //           sequelize.literal("(clock_out_time - clock_in_time)")
//   //         ),
//   //         "hour",
//   //       ],
//   //       [
//   //         sequelize.fn(
//   //           "date_part",
//   //           "min",
//   //           sequelize.literal("(clock_out_time - clock_in_time)")
//   //         ),
//   //         "min",
//   //       ],
//   //       // [sequelize.literal("(hour)"), "difference"],
//   //       // [sequelize.literal("(clock_out_time - clock_in_time)"), "score"],
//   //     ],
//   //   },
//   //   where: {
//   //     user_id: user.id,
//   //   },
//   // });
//   // // const hour = await sequelize.query(
//   // //   `SELECT DATE_PART('hour',${attendance.clock_in_time}) FROM attendance;`
//   // // );
//   // // hour.forEach(async (element) => {
//   // //   console.log(element);
//   // // });
//   // // console.log(attendance);
//   // attendance.forEach((attendance) => {
//   //   console.log(`${attendance.dataValues.hour}:${attendance.dataValues.min}`);
//   // });
//   // res.json(attendance);

//   // res.json(attendance);
//   // const attendance = await user.getattendance_list();
//   // res.json(attendance);
//   // const attendance = await Attendance.findAll({ where: { user_id: user.id } });
//   // // console.log(attendance);
//   // if (!attendance.length > 0) {
//   //   res.json(`No attendance for user:${user.username}`);
//   // }

//   // let dateHours = [];
//   // attendance.forEach((attendance) => {
//   //   let obj = {};
//   //   obj.date = attendance.date;
//   //   if (!attendance.clock_out_time) {
//   //     obj.msg = "No clockout time yet";
//   //     dateHours.push(obj);
//   //     return;
//   //   }
//   //   const differenceValue =
//   //     attendance.clock_out_time - attendance.clock_in_time;

//   //   obj.hours = parseInt((Math.abs(differenceValue) / (1000 * 60 * 60)) % 24);
//   //   obj.min = parseInt((Math.abs(differenceValue) / (1000 * 60)) % 60);
//   //   dateHours.push(obj);
//   // });
//   // console.log(dateHours);
//   // res
//   //   .status(200)
//   //   .json({ attendance, num: attendance.length, differenceOnDates: dateHours });
// });

app.post("/attendance/:id", async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.json(`No user with id: ${userId}`);
  }

  const { date, day_type, clock_in_time, clock_out_time } = req.body;

  const attendance = await Attendance.create({
    date,
    day_type,
    clock_in_time,
    clock_out_time,
    user_id: user.id,
  });
  res.status(200).json(attendance);
});

app.get("/projects", async (req, res) => {
  const projects = await Project.findAll();
  res.status(200).json(projects);
});

app.post("/projects", async (req, res) => {
  const { name, start_date, submission_date, project_lead } = req.body;
  const project = await Project.create({
    name,
    start_date,
    submission_date,
    project_lead,
  });
  res.status(200).json(project);
});

app.get("/project-user", async (req, res) => {
  const projectUsers = await Project_User.findAll({});
  res.status(200).json(projectUsers);
});

app.get("/test", async (req, res) => {
  const { user_id, project_id } = req.body;
  const user = await User.findOne({ where: { id: user_id } });
  if (!user) {
    res.json(`No user with id: ${user_id}`);
  }

  const project = await Project.findOne({ where: { id: project_id } });
  if (!project) {
    res.json(`No project with id: ${project_id}`);
  }

  await project.addUser(user);

  // console.log(user.toJSON());
  // console.log(project.toJSON());
  res.json({ msg: "ok" });
});

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await sequelize.authenticate();
    // console.log(db);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  app.listen(port, () => {
    console.log(`listening at port ${port}`);
  });
};

start();
