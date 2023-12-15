'use strict';
const axios = require('axios');

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
    const response = await axios.get('https://api.imgflip.com/get_memes');
    const memes = response.data.data.memes.slice(0, 100);

    const memeData = memes.map((meme, index) => ({
      otherId: meme.id,
      title: meme.name,
      imageUrl: meme.url,
      width: meme.width,
      height: meme.height,
      boxCount: meme.box_count,
      captions: meme.captions,
      text1: '',
      text2: '',
      text3: '',
      text4: '',
      text5: '',
      status:  index > 50 ? 'premium' : 'basic',
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Memes', memeData, null);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Memes', null, null)
  }
};
