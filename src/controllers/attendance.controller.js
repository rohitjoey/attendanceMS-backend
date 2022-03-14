const { sequelize } = require("../database/models");

const getAttendances = async (req, res) => {
  console.log(req.locals.tokenObject);
  console.log(req.isAuthenticated());
  const user = req.user;

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

module.exports = { getAttendances };
