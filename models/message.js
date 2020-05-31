'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    message: DataTypes.STRING
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, {
      foreignKey: 'SenderId',
      onDelete: 'CASCADE',
      as: 'Sender',
      constraints: false
    });

    Message.belongsTo(models.User, {
      foreignKey: 'ReceiverId',
      onDelete: 'CASCADE',
      as: 'Receiver',
      constraints: false
    });

  };
  return Message;
};