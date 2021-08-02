'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [{
        name: 'Category 1',
        description: 'Category 1 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'Category 2',
        description: 'Category 2 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 3',
        description: 'Category 3 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 4',
        description: 'Category 4 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 5',
        description: 'Category 5 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 6',
        description: 'Category 6 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 7',
        description: 'Category 7 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 8',
        description: 'Category 8 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 9',
        description: 'Category 9 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 10',
        description: 'Category 10 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 11',
        description: 'Category 11 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 12',
        description: 'Category 12 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 13',
        description: 'Category 13 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      }, {
        name: 'Category 14',
        description: 'Category 14 description',
        image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
        createdAt: new Date,
        updatedAt: new Date
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};