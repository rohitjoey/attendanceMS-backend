"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("project_user", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("project_user", {
      fields: ["user_id"],
      type: "foreign key",
      name: "user_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("project_user", {
      fields: ["project_id"],
      type: "foreign key",
      name: "project_id",
      references: {
        table: "project",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    // await queryInterface.addConstraint("project_user", {
    //   fields: ["user_id", "project_id"],
    //   type: "primary key",
    //   name: "id",
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("project_user");
  },
};
