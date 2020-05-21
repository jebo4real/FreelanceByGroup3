'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define('Contract', {
    status: DataTypes.STRING,
    acceptance: DataTypes.STRING,
    note: DataTypes.STRING
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