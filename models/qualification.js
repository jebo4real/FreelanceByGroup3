'use strict';
module.exports = (sequelize, DataTypes) => {
  const Qualification = sequelize.define('Qualification', {
    prof_cert: DataTypes.STRING,
    con_org: DataTypes.STRING,
    summary: DataTypes.STRING
  }, {});
  Qualification.associate = function(models) {
    // associations can be defined here
    Qualification.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Qualification;
};