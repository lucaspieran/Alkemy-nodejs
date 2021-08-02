'use strict';
const bcrypt = require('bcrypt');
const password = async ()=> {
  let pass = await bcrypt.hash('1234', 10)
  return pass;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Admin1',
      lastName: 'Demo',
      email: 'admin@test1.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin2',
      lastName: 'Demo',
      email: 'admin@test2.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin3',
      lastName: 'Demo',
      email: 'admin@test3.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin4',
      lastName: 'Demo',
      email: 'admin@test4.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin5',
      lastName: 'Demo',
      email: 'admin@test5.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin6',
      lastName: 'Demo',
      email: 'admin@test6.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin7',
      lastName: 'Demo',
      email: 'admin@test7.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin8',
      lastName: 'Demo',
      email: 'admin@test8.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin9',
      lastName: 'Demo',
      email: 'admin@test9.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Admin10',
      lastName: 'Demo',
      email: 'admin@test10.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 1,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario1',
      lastName: 'Demo',
      email: 'user@test1.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario2',
      lastName: 'Demo',
      email: 'user@test2.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario3',
      lastName: 'Demo',
      email: 'user@test3.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario4',
      lastName: 'Demo',
      email: 'user@test4.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario5',
      lastName: 'Demo',
      email: 'user@test5.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario6',
      lastName: 'Demo',
      email: 'user@test6.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario7',
      lastName: 'Demo',
      email: 'user@test7.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario8',
      lastName: 'Demo',
      email: 'user@test8.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario9',
      lastName: 'Demo',
      email: 'user@test9.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Usuario10',
      lastName: 'Demo',
      email: 'user@test10.com',
      // Important: Password not encrypted yet! 
      password:  `${await password()}`,
      roleId: 2,
      photo: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
