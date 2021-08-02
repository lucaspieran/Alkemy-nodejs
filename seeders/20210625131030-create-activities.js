'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * creo una variable para guardar registros con valores por defecto, agregué la funcion new Date()
     * porque sin eso, me creaba un registro con fecha de creacion 0000-00-00 00:00:00
     */
    let activities = [
      {
        name: 'testSeeder',
        image: 'testImage1',
        content: 'testContent1',
        createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
        name: 'testSeeder2',
        image: 'testImage2',
        content: 'testContent2',
        createdAt: new Date(),
         updatedAt: new Date(),
      },
      {
        name: 'testSeeder3',
        image: 'testImage3',
        content: 'testContent3',
        createdAt: new Date(),
         updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('activities', activities, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */
    await queryInterface.bulkDelete('activities', null, {});
  },
};
