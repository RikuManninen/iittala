'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  up: (queryInterface, Sequelize) => {
    const testUsers = [];
    testUsers.push({
      email: 'admin@admin.com',
      encryptedPassword: bcrypt.hashSync(process.env.ADMIN_PASS, 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return queryInterface.bulkInsert('Users', testUsers, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
