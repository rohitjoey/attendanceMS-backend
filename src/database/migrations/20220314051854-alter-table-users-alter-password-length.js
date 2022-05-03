"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
    });

    // await queryInterface.addConstraint("users", {
    //   fields: ["username"],
    //   type: "unique",
    //   name: "unique_constraint_username",
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.changeColumn("users", "password", {
      type: Sequelize.STRING,
    });
  },
};
