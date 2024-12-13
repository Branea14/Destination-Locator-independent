'use strict';
const {Booking} = require('../models')


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        startDate: "03/09/2025",
        endDate: "03/16/2025"
      },
      {
        spotId: 2,
        userId: 2,
        startDate: "03/17/2025",
        endDate: "03/24/2025"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "03/25/2025",
        endDate: "04/01/2025"
      },
      {
        spotId: 4,
        userId: 4,
        startDate: "04/02/2025",
        endDate: "04/09/2025"
      },
      {
        spotId: 5,
        userId: 5,
        startDate: "04/10/2025",
        endDate: "04/17/2025"
      },
      {
        spotId: 6,
        userId: 1,
        startDate: "05/01/2025",
        endDate: "05/08/2025"
      },
      {
        spotId: 7,
        userId: 2,
        startDate: "05/09/2025",
        endDate: "05/16/2025"
      },
      {
        spotId: 8,
        userId: 3,
        startDate: "05/17/2025",
        endDate: "05/24/2025"
      },
      {
        spotId: 9,
        userId: 4,
        startDate: "05/25/2025",
        endDate: "06/01/2025"
      },
      {
        spotId: 10,
        userId: 5,
        startDate: "06/02/2025",
        endDate: "06/09/2025"
      },
    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: {
        [Op.in]: [
          "03/09/2025",
          "03/17/2025",
          "03/25/2025",
          "04/02/2025",
          "04/10/2025",
          "05/01/2025",
          "05/09/2025",
          "05/17/2025",
          "05/25/2025",
          "06/02/2025",
          "07/01/2025",
          "07/09/2025",
          "07/17/2025",
          "07/25/2025",
          "08/02/2025"
        ]
      }
    }, {});
  }
};
