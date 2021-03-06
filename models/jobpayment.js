'use strict';
module.exports = (sequelize, DataTypes) => {
  const JobPayment = sequelize.define('JobPayment', {
    clientPaymentReceipt: DataTypes.STRING,
    clientPay: DataTypes.BOOLEAN,
    freelancePay: DataTypes.BOOLEAN
  }, {});
  JobPayment.associate = function(models) {
    // associations can be defined here
    JobPayment.belongsTo(models.Job,{
      foreignKey:'JobId',
      onDelete: 'CASCADE'
    });
  };
  return JobPayment;
};