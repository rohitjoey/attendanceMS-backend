const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User_detail extends Model {
    static associate({ User, Department }) {
      // define association here
      this.belongsTo(User, {
        foreignKey: { name: "user_id", type: DataTypes.UUID, allowNull: false },
      });
      this.belongsTo(Department, {
        foreignKey: {
          name: "department_id",
          type: DataTypes.UUID,
        },
      });
    }
  }

  User_detail.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "first_name",
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: "last_name",
        validate: {
          notEmpty: true,
        },
      },
      gender: {
        type: DataTypes.STRING(8),
        allowNull: false,
        validate: {
          isIn: [["male", "female", "Male", "Female"]],
        },
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      contact: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        validate: {
          isEmail: true,
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      department_id: {
        type: DataTypes.UUID,
      },
    },
    {
      // Other model options go here
      tableName: "user_detail",
      sequelize, // We need to pass the connection instance
      modelName: "User_detail", // We need to choose the model name
      timestamps: false,
    }
  );
  return User_detail;
};
