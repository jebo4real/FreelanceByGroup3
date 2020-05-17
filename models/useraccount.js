'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define('UserAccount', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    blocked: DataTypes.BOOLEAN
  }, {});
  UserAccount.associate = function(models) {
    // associations can be defined here
    UserAccount.belongsTo(models.User,{
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });

    UserAccount.belongsTo(models.Role, {
      foreignKey: 'RoleId',
      onDelete: 'SET NULL'
    });
  };
  return UserAccount;
};