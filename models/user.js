'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    jobTitle: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    mobile: {
      type: DataTypes.STRING
    },
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    picture: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.UserAccount,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Job, {
      foreignKey: 'ClientId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.JobApplication, {
      foreignKey: 'FreelanceId',
      onDelete: 'CASCADE'
    });

    User.hasOne(models.UserPaymentInfo,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Chat, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Chat, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Notification, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.JobReport, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.JobFiles, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Portfolio, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Message, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE'
    });

    User.hasMany(models.Message, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE'
    });

  };
  return User;
};