'use strict';
module.exports = (sequelize, DataTypes) => {
  const Education = sequelize.define('Education', {
    country: DataTypes.STRING,
    uni: DataTypes.STRING,
    cert: DataTypes.STRING,
    start_year: DataTypes.STRING,
    endyear: DataTypes.STRING
  }, {});
  Education.associate = function(models) {
    // associations can be defined here
    Education.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Education;
};