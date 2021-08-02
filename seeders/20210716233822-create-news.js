'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('News', [{
      name: 'Las buenas nuevas',
      content: 'Todos los participantes del grupo 44 consiguen trabajo y el mentor consigue su trabajo soñado en el exterior',
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      categoryId: 2,
      createdAt: new Date,
      updatedAt: new Date,
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('News', null, {});
  }
};
