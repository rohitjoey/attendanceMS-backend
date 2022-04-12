const { sequelize } = require("../database/models");
const { Attendance } = require("../database/models");

const getAttendances = async (req, res) => {
  // console.log(req.locals.tokenObject);
  // console.log(req.isAuthenticated());
  const user = req.user;
  // if (!user) {
  //   console / log("herer");
  // }

  const attendance = await user.getAttendances({
    attributes: {
      include: [
        [
          sequelize.fn(
            "date_part",
            "hour",
            sequelize.literal("(clock_out_time - clock_in_time)")
          ),
          "hour",
        ],
        [
          sequelize.fn(
            "date_part",
            "min",
            sequelize.literal("(clock_out_time - clock_in_time)")
          ),
          "min",
        ],
        // [sequelize.literal("(hour)"), "difference"],
        // [sequelize.literal("(clock_out_time - clock_in_time)"), "score"],
      ],
    },
  });

  //   attendance.forEach((attendance) => {
  //     console.log(`${attendance.dataValues.hour}:${attendance.dataValues.min}`);
  //   });

  res.status(200).json({ attendance, no: attendance.length });
};

const clockIn = async (req, res) => {
  const user = req.user;
  const { id: userId } = user.toJSON();
  // console.log(new Date());

  const { date, day_type, clock_in_time, clock_out_time } = req.body;

  const attendance = await Attendance.create({
    date,
    day_type,
    clock_in_time,
    clock_out_time,
    user_id: userId,
  });
  // console.log(attendance);

  // await user.addAttendance(attendance);
  // console.log(user);
  res.status(200).json(attendance);
};

const clockOut = async (req, res) => {
  const user = req.user;
  const { id: userId } = user.toJSON();
  // console.log(new Date());

  // console.log(userId);
  // console.log(req.params);
  const attendanceId = await Attendance.max("id", {
    where: {
      user_id: userId,
    },
  });
  // console.log(attendanceId);
  // const { id: attendanceId } = req.params;
  const { clock_out_time } = req.body;

  const aId = await Attendance.findOne({
    where: {
      id: attendanceId,
    },
  });

  // console.log(aId.user_id);

  if (aId.user_id === userId) {
    const attendance = await Attendance.update(
      { clock_out_time: clock_out_time },
      {
        where: {
          id: attendanceId,
        },
      }
    );
    res.status(200).json(attendance);
  } else {
    res.json({ msg: "something went wrong" });
  }

  // console.log(attendance);

  // await user.addAttendance(attendance);
  // console.log(user);
};

module.exports = { getAttendances, clockIn, clockOut };
