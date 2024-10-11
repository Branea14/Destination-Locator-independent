'use strict';

const { Review } = require('../models');
const reviews = [
  {}
];

/** @type {import('sequelize-cli').Migration} */
module.exports = { async up (queryInterface, Sequelize) {
   await Review.bulkCreate([
    {

    }
   ])

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
