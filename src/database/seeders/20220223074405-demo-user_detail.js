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
      "user_detail",
      [
        {
          first_name: "nirjala",
          last_name: "shrestha",
          gender: "female",
          dob: "1999-2-2",
          contact: "984654261",
          address: "sll",
          email: "nir@gmail.com",
          user_id: "aa8c407a-4e59-4973-acdb-f2168d25ed3a",
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
    await queryInterface.bulkDelete("user_detail", null, {});
  },
};
