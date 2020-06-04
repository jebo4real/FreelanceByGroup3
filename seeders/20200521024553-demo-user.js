'use strict';

const crypto = require('crypto');
let secret = "group3";

const hashPassword = (password) =>{
  return crypto.createHmac('sha256', secret)
      .update(password)
      .digest('hex');
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {id:'32fe0cf3-d47d-452b-aae8-06d16a5fa520', firstname: 'Alex', lastname: 'Amankwa', email: 'admin1@gmail.com', mobile: '02344534656',createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'},
      {id:'56fe0cf3-d47d-492b-aae8-06d16a5fa410', firstname: 'Anita', lastname: 'Owusu', email: 'admin2@gmail.com', mobile: '02323444656',createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'}
    ], {});

    const users = await queryInterface.sequelize.query(
        `SELECT id from Users;`
    );

    const usersRows = users[0];

    return queryInterface.bulkInsert('UserAccounts', [
      {username: 'admin1', password: hashPassword('admin'), UserId: usersRows[0].id, RoleId: 3, verified:true, createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'},
      {username: 'admin2', password: hashPassword('admin'), UserId: usersRows[0].id, RoleId: 3, verified:true, createdAt:'2020-05-25 00:00:00',
        updatedAt:'2020-05-25 00:00:00'},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Useraccounts', null, {});
  }
};

