'use strict';
module.exports = (sequelize, DataTypes) => {
  const PaymentDetails = sequelize.define('PaymentDetails', {
    apikey: DataTypes.STRING
  }, {});
  PaymentDetails.associate = function(models) {
    // associations can be defined here
  };
  return PaymentDetails;
};