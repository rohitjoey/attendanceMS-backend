const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: { name: "user_id", type: DataTypes.UUID, allowNull: false },
      });
    }
  }

  Attendance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      day_type: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          isIn: [["weekday", "holiday"]],
        },
      },
      clock_in_time: {
        type: DataTypes.DATE,
      },
      clock_out_time: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "attendance",
      modelName: "Attendance",
    }
  );
  return Attendance;
};
