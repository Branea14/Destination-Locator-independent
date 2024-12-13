'use strict';
const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 2,
        url: 'https://images.pexels.com/photos/29721407/pexels-photo-29721407/free-photo-of-cozy-indoor-baking-scene-with-cake-preparation.jpeg',
      },
      {
        reviewId: 3,
        url: 'https://images.pexels.com/photos/16044769/pexels-photo-16044769/free-photo-of-messy-retro-fridge.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        reviewId: 4,
        url: 'https://images.pexels.com/photos/15061977/pexels-photo-15061977/free-photo-of-misty-foggy-road-next-to-spacex-launch-facility.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        reviewId: 6,
        url: 'https://images.pexels.com/photos/7510667/pexels-photo-7510667.jpeg',
      },
      {
        reviewId: 7,
        url: 'https://images.pexels.com/photos/271743/pexels-photo-271743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        reviewId: 9,
        url: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
      {
        reviewId: 10,
        url: 'https://images.pexels.com/photos/10061386/pexels-photo-10061386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
     reviewId: {[Op.in]: [2, 3, 4, 6, 7, 9, 10, 12]}
    }, {})
  }
};
