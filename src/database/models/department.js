const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate({ User_detail }) {
      this.hasMany(User_detail, {
        as: "users",
        foreignKey: {
          name: "department_id",
          type: DataTypes.UUID,
        },
      });
    }
  }

  Department.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      hod: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      tableName: "department",
      modelName: "Department",
      timestamps: false,
    }
  );

  return Department;
};
