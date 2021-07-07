"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("globalProducts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameProduct: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      price: { type: Sequelize.INTEGER(20), allowNull: false, defaultValue: 0 },
      description: Sequelize.STRING,
      total: { type: Sequelize.INTEGER(20), allowNull: false, defaultValue: 0 },
      images: Sequelize.STRING,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("globalProducts");
  },
};
