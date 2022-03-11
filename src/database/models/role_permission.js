const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role_Permission extends Model {}

  Role_Permission.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      role_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      permission_id: {
        type: DataTypes.UUID,
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
