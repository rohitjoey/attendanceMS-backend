const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ User, Permission, Role_Permission }) {
      this.belongsTo(User, {
        foreignKey: { name: "role_id", type: DataTypes.UUID, allowNull: false },
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
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
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
