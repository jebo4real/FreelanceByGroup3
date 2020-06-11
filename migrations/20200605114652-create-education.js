'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Education', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Users',
          key:'id'
        }
      },
      country: {
        type: Sequelize.STRING
      },
      uni: {
        type: Sequelize.STRING
      },
      cert: {
        type: Sequelize.STRING
      },
      start_year: {
        type: Sequelize.STRING
      },
      endyear: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable('Education');
  }
};