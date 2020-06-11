'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      JobId:{
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model: 'Jobs',
          key:'id'
        }
      },
      status: {
        type: Sequelize.STRING
      },
      acceptance: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      freelance_review: {
        type: Sequelize.STRING
      },
      client_review: {
        type: Sequelize.STRING
      },
      freelance_rating: {
        type: Sequelize.INTEGER
      },
      client_rating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Contracts');
  }
};