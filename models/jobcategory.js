'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobCategory = sequelize.define('JobCategory', {
    name: DataTypes.STRING
  }, {});
  JobCategory.associate = function(models) {
    // associations can be defined here
    JobCategory.hasMany(models.Job,{
      foreignKey: 'CatId',
      onUpdate: 'CASCADE'
    });

  };
  return JobCategory;
};