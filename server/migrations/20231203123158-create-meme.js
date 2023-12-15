'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Memes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      otherId: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      width: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.INTEGER
      },
      boxCount: {
        type: Sequelize.INTEGER
      },
      captions: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      text1: {
        type: Sequelize.STRING
      },
      text2: {
        type: Sequelize.STRING
      },
      text3: {
        type: Sequelize.STRING
      },
      text4: {
        type: Sequelize.STRING
      },
      text5: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Memes');
  }
};