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
      "department",
      [
        {
          name: "Engineering",
          hod: "Sahas",
        },
        {
          name: "Administration",
          hod: "Nirjal",
        },
        {
          name: "Finance",
          hod: "Nirajan",
        },
        {
          name: "Management",
          hod: "Hari",
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
