'use strict';

const { hashPassword } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require('../user.json').map(el => {
      delete el.id
      el.createdAt = el.updatedAt = new Date()
      el.password = hashPassword(el.password)
      return el
    })
    await queryInterface.bulkInsert('Users', user)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true, cascade: true })
  }
};
