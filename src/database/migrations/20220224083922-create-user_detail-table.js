"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("user_detail", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "first_name",
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: "last_name",
        validate: {
          notEmpty: true,
        },
      },
      gender: {
        type: Sequelize.STRING(8),
        allowNull: false,
        validate: {
          isIn: [["male", "female", "Male", "Female"]],
        },
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      contact: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        validate: {
          isEmail: true,
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      department_id: {
        type: Sequelize.INTEGER,
      },
      role_id: {
        type: Sequelize.INTEGER,
      },
    });
    await queryInterface.addConstraint("user_detail", {
      fields: ["gender"],
      type: "check",
      where: {
        gender: ["male", "female", "Male", "Female"],
      },
    });
    await queryInterface.addConstraint("user_detail", {
      fields: ["user_id"],
      type: "foreign key",
      name: "detail_id",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("user_detail", {
      fields: ["department_id"],
      type: "foreign key",
      name: "department_id",
      references: {
        table: "department",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("user_detail", {
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
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("user_detail");
  },
};
