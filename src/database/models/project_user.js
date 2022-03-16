const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project_User extends Model {}

  Project_User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "project_user",
      modelName: "Project_User",
    }
  );
  return Project_User;
};
