const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role_Permission extends Model {}

  Role_Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      timestamps: false,
      tableName: "role_permission",
      modelName: "Role_Permission",
    }
  );
  return Role_Permission;
};
