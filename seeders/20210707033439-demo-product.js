"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("globalProducts", [
      {
        nameProduct: "Samsung PQW",
        price: "50000",
        description: "kualitas bagus,mulus,aslina teu ngawaduk!",
        total: 20,
        images: "https://iili.io/BieFN2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("globalProducts", null, {});
  },
};
