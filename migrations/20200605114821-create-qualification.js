'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Qualifications', {
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
      prof_cert: {
        type: Sequelize.STRING
      },
      con_org: {
        type: Sequelize.STRING
      },
      summary: {
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
    return queryInterface.dropTable('Qualifications');
  }
};