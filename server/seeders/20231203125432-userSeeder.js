'use strict';
const Crypto = require("crypto");

const { hash } = require('../helper/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let dataUser = require('../data/user.json').map((el) => {
      el.password = hash(el.password)
      el.createdAt = new Date()
      el.updatedAt = new Date()
      el.verified = true
      el.verifyToken = Crypto.randomBytes(10).toString("hex");

      return el
    })

    await queryInterface.bulkInsert('Users', dataUser, null)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Users', null, null)
  }
};
