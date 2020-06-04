'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    status: DataTypes.STRING,
    acceptance: DataTypes.STRING,
    note: DataTypes.STRING,
    freelance_review: DataTypes.STRING,
    client_review: DataTypes.STRING,
    freelance_rating: DataTypes.INTEGER,
    client_rating: DataTypes.INTEGER
  }, {});
  Contract.associate = function(models) {
    // associations can be defined here
    Contract.belongsTo(models.Job,{
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });
  };
  return Contract;
};