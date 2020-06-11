'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ClientId:{
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references:{
          model: 'Users',
          key:'id'
        }
      },
      CatId:{
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        references:{
          model: 'JobCategories',
          key:'id'
        }
      },
      title: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      timeLength: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(6, 2)
      },
      skills: {
        type: Sequelize.STRING
      },
      status: {
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
    return queryInterface.dropTable('Jobs');
  }
};