"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "role",
      [
        {
          title: "engineer",
          description: "",
          role_code: "er",
        },
        {
          title: "senior engineer",
          description: "",
          role_code: "srer",
        },
        {
          title: "intern",
          description: "",
          role_code: "in",
        },
        {
          title: "admin officer",
          description: "",
          role_code: "adof",
        },
        {
          title: "trainee",
          description: "",
          role_code: "tr",
        },
        {
          title: "finance officer",
          description: "",
          role_code: "fnof",
        },
        {
          title: "finance head",
          description: "",
          role_code: "fnhd",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
