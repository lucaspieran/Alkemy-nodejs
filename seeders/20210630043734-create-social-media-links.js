'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('SocialMedia', [{
        facebook: 'facebook.com',
        linkedin: 'linkedin.com',
        instagram: 'instagram.com',
        OrganizationId:1,
        createdAt: new Date,
        updatedAt: new Date
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkDelete('SocialMedia', null, {});
     
  }
};
