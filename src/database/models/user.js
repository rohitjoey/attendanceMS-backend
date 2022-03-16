const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ User_detail, Attendance, Project, Project_User, Role }) {
      // define association here
      this.hasOne(User_detail, {
        foreignKey: { name: "user_id", type: DataTypes.UUID, allowNull: false },
      });
      this.hasOne(Role, {
        foreignKey: { name: "role_id", type: DataTypes.UUID, allowNull: false },
      });
      this.hasMany(Attendance, {
        // as: "attendance_list",
        foreignKey: { name: "user_id", type: DataTypes.UUID, allowNull: false },
      });

      this.belongsToMany(Project, {
        through: Project_User,
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING(50),
        validate: {
          notEmpty: true,
          is: {
            args: /^\S*$/,
            msg: "Username cannot contain space between text",
          },
        },
        set(value) {
          this.setDataValue("username", value.trim().toLowerCase());
          // this.setDataValue("username", value.toLowerCase());
        },
        get() {
          const rawValue = this.getDataValue("username");
          return rawValue.toLowerCase();
        },
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verified_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
      timestamps: false,
    }
  );
  // for (let key in User.rawAttributes) {
  //   console.log("Field: ", key); // this is name of the field
  //   // console.log("TypeField: ", User.rawAttributes[key].type.key); // Sequelize type of field
  // }
  return User;
};
