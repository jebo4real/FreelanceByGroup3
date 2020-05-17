'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobApplication = sequelize.define('JobApplication', {
    status: DataTypes.STRING
  }, {});
  JobApplication.associate = function(models) {
    // associations can be defined here
    JobApplication.belongsTo(models.User, {
      foreignKey: 'FreelanceId',
      onDelete: 'CASCADE'
    });

    JobApplication.belongsTo(models.Job,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });
  };
  return JobApplication;
};