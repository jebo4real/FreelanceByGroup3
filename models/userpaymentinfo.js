'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPaymentInfo = sequelize.define('UserPaymentInfo', {
    accountNumber: DataTypes.STRING
  }, {});
  UserPaymentInfo.associate = function(models) {
    // associations can be defined here
    UserPaymentInfo.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return UserPaymentInfo;
};