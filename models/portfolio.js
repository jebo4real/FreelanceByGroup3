'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    projectLinks: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  Portfolio.associate = function(models) {
    // associations can be defined here
    Portfolio.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Portfolio;
};