'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Testimonials', [{
        name: 'John Doe',
        image: 'https://e.an.amtv.pe/util-e-interesante-como-quitar-fondo-imagen-word-n340064-640x360-683953.jpg',
        content: 'test',
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Testimonials', null, {});
     
  }
};
