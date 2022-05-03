const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ User_detail, Permission, Role_Permission }) {
      this.hasMany(User_detail, {
        foreignKey: {
          name: "role_id",
          type: DataTypes.INTEGER,
        },
      });

      this.belongsToMany(Permission, {
        through: Role_Permission,
        foreignKey: "role_id",
      });
    }
  }

  Role.init(
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
      role_code: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
    },
    {
      tableName: "role",
      sequelize,
      modelName: "Role",
      timestamps: false,
    }
  );
  return Role;
};
