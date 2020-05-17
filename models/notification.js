'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    title: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  Notification.associate = function(models) {
    // associations can be defined here
    Notification.belongsTo(models.User,{
      foreignKey:'ReceiverId',
      onDelete: 'CASCADE'
    });


  };
  return Notification;
};