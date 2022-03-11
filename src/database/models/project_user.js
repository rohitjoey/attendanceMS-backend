const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project_User extends Model {}

  Project_User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.UUID,
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
