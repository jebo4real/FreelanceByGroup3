'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'client',
        createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'
      },{
        id: 2,
        name: 'freelancer',
        createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'
      },{
      id: 3,
      name: 'admin',
        createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
