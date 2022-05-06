"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      "permission",
      [
        {
          title: "viewAllUsers",
          description: "",
          permission_code: "vall",
        },
        {
          title: "viewUsers",
          description: "",
          permission_code: "vu",
        },
        {
          title: "assignRole",
          description: "",
          permission_code: "ar",
        },
        {
          title: "assignDepartment",
          description: "",
          permission_code: "ad",
        },
        {
          title: "createRole",
          description: "",
          permission_code: "cr",
        },
        {
          title: "deleteRole",
          description: "",
          permission_code: "dr",
        },
        {
          title: "deleteDepartment",
          description: "",
          permission_code: "dd",
        },
        {
          title: "createDepartment",
          description: "",
          permission_code: "cd",
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
     */
    await queryInterface.bulkDelete("People", null, {});
  },
};
