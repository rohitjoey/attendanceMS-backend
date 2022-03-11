"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("department", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        validate: {
          notEmpty: true,
        },
      },
      hod: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable("department");
  },
};
