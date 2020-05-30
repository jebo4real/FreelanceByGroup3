'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'FreelanceId',
      onDelete: 'CASCADE',
      as: 'Freelance',
      constraints: false
    });

    Message.belongsTo(models.User, {
      foreignKey: 'ClientId',
      onDelete: 'CASCADE',
      as: 'Client',
      constraints: false
    });

  };
  return Message;
};