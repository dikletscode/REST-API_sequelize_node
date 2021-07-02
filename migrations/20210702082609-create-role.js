"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("role", {
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role_name: {
        type: Sequelize.STRING(12),
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("role");
  },
};
