"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Organizations",
      [
        {
          name: "Usuario",
          image: "Demo",
          address: "Segurola 2314",
          email: "test@test.com",
          phone: 1551445556,
          welcomeText: "Welcome text test",
          aboutUsText: "About us text",
          image:
            "https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});
  },
};
