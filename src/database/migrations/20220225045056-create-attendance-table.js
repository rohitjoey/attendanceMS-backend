"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("attendance", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        primaryKey: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      day_type: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          isIn: [["workday", "holiday"]],
        },
      },
      clock_in_time: {
        type: Sequelize.DATE,
      },
      clock_out_time: {
        type: Sequelize.DATE,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("attendance", {
      fields: ["day_type"],
      type: "check",
      where: {
        day_type: ["weekday", "holiday"],
      },
    });

    await queryInterface.addConstraint("attendance", {
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
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("attendance");
  },
};
