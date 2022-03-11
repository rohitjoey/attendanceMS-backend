"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("role_permission", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      permission_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("role_permission", {
      fields: ["role_id"],
      type: "foreign key",
      name: "role_id",
      references: {
        table: "role",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("role_permission", {
      fields: ["permission_id"],
      type: "foreign key",
      name: "permission_id",
      references: {
        table: "permission",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("role_permission", {
      fields: ["role_id", "permission_id"],
      type: "primary key",
      name: "id",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("role_permission");
  },
};
