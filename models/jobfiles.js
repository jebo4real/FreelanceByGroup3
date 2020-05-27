'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobFiles = sequelize.define('JobFiles', {
    filename: DataTypes.STRING
  }, {});
  JobFiles.associate = function(models) {
    // associations can be defined here
    JobFiles.belongsTo(models.Job,{
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });

    JobFiles.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

  };
  return JobFiles;
};