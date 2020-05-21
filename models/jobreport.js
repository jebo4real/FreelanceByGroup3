'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobReport = sequelize.define('JobReport', {
    report: DataTypes.STRING
  }, {});
  JobReport.associate = function(models) {
    // associations can be defined here
    JobReport.belongsTo(models.Job,{
      foreignKey: 'JobId',
      onDelete: 'CASCADE'
    });

    JobReport.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

  };
  return JobReport;
};