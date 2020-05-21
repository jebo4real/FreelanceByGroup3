'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('JobCategories', [{
      name: 'Video Editing',
    },{
      name: 'Photography',
    },{
      name: 'Data Analysis',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('JobCategories', null, {});
  }
};
