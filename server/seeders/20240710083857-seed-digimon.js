"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://digimon-api.vercel.app/api/digimon",
    };

    try {
      const response = await axios.request(options);
      const data = response.data.map(el => {
        return { name: el.name, imgUrl: el.img, level: el.level, createdAt: new Date(), updatedAt: new Date() }
      })

      await queryInterface.bulkInsert("Digimons", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Digimons", null, { truncate: true, restartIdentity: true, cascade: true });
  },
};