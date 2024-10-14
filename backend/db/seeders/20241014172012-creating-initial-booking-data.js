'use strict';
const {Booking} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Booking.bulkCreate([
    {
      startDate: "03/09/2025",
      endDate: "03/16/2025"
    },
    {
      startDate: "10/08/2025",
      endDate: "10/15/2025"

    },
    {
      startDate: "04/01/2025",
      endDate: "04/08/2025"
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
