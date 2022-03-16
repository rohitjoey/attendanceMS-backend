const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    static associate({ Role, Role_Permission }) {
      this.belongsToMany(Role, {
        through: Role_Permission,
        foreignKey: "permission_id",
      });
    }
  }
  Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(25),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      permission_code: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
    },
    {
      tableName: "permission",
      sequelize,
      modelName: "Permission",
      timestamps: false,
    }
  );
  return Permission;
};
