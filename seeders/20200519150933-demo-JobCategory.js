'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('JobCategories', [{
      name: 'Video Editing',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },{
      name: 'Photography',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    },{
      name: 'Data Analysis',
      createdAt:'2020-05-25 00:00:00',
      updatedAt:'2020-05-25 00:00:00'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('JobCategories', null, {});
  }
};
