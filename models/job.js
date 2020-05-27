'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    details: DataTypes.STRING,
    timeLength: DataTypes.STRING,
    price: DataTypes.DECIMAL(6, 2),
    skills: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
    Job.belongsTo(models.User,{
      foreignKey: 'ClientId',
      onDelete: 'CASCADE'
    });

    Job.belongsTo(models.JobCategory,{
      foreignKey: 'CatId',
      onUpdate: 'CASCADE'
    });

    Job.hasMany(models.JobApplication,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobPayment,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.Chat,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasOne(models.Contract,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobReport,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });

    Job.hasMany(models.JobFiles,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });
  };
  return Job;
};