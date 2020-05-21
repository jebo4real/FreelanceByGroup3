'use strict';

const crypto = require('crypto');
let secret = "cv";

const hashPassword = (password) =>{
  return crypto.createHmac('sha256', secret)
      .update(password)
      .digest('hex');
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {id:'32fe0cf3-d47d-452b-aae8-06d16a5fa520', firstname: 'Joe', lastname: 'Fraizier', email: 'admin1@gmail.com', mobile: '02344534656'},
      {id:'56fe0cf3-d47d-492b-aae8-06d16a5fa410', firstname: 'Joe', lastname: 'Luis', email: 'admin2@gmail.com', mobile: '02323444656'}
    ], {});

    const users = await queryInterface.sequelize.query(
        `SELECT id from users;`
    );

    const usersRows = users[0];

    return queryInterface.bulkInsert('Useraccounts', [
      {username: 'admin1', password: hashPassword('admin'), UserId: usersRows[0].id, RoleId: 3},
      {username: 'admin2', password: hashPassword('admin'), UserId: usersRows[0].id, RoleId: 3},
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('useraccounts', null, {});
  }
};

