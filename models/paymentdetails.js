'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define('PaymentDetails', {
    email: DataTypes.STRING,
    apikey: DataTypes.STRING
  }, {});
  PaymentDetails.associate = function(models) {
    // associations can be defined here
  };
  return PaymentDetails;
};