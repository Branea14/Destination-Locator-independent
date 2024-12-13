'use strict';
const { query } = require("express");
const {Review} = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate([
      {
        spotId: 3,
        userId: 1,
        review: "Location has great hospitality.",
        stars: 4
      },
      {
        spotId: 1,
        userId: 2,
        review: "I swear I saw a ghost in the kitchen. 10/10 would haunt again!",
        stars: 5
      },
      {
        spotId: 5,
        userId: 3,
        review: "Nice view, but the fridge made a weird humming noise all night.",
        stars: 3
      },
      {
        spotId: 7,
        userId: 4,
        review: "Felt like I was being abducted by aliens. Loved it!",
        stars: 5
      },
      {
        spotId: 2,
        userId: 5,
        review: "The place is fine, but the owner kept talking about turbo powers. Weird.",
        stars: 2
      },
      {
        spotId: 8,
        userId: 1,
        review: "Great location for stargazing. Very quiet at night.",
        stars: 4
      },
      {
        spotId: 4,
        userId: 2,
        review: "Smelled like grandma’s attic. Nostalgic but not for everyone.",
        stars: 3
      },
      {
        spotId: 9,
        userId: 3,
        review: "I loved the vibe of the place, but the decor was a bit outdated.",
        stars: 4
      },
      {
        spotId: 6,
        userId: 4,
        review: "Mount Fuji view is incredible, but I wish there were more towels.",
        stars: 4
      },
      {
        spotId: 10,
        userId: 5,
        review: "Perfect for a quiet retreat. The bed was so comfortable!",
        stars: 5
      },

    ], { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        [Op.or]: [
          { spotId: 3, userId: 1, review: "Location has great hospitality." },
          { spotId: 1, userId: 2, review: "I swear I saw a ghost in the kitchen. 10/10 would haunt again!" },
          { spotId: 5, userId: 3, review: "Nice view, but the fridge made a weird humming noise all night." },
          { spotId: 7, userId: 4, review: "Felt like I was being abducted by aliens. Loved it!" },
          { spotId: 2, userId: 5, review: "The place is fine, but the owner kept talking about turbo powers. Weird." },
          { spotId: 8, userId: 1, review: "Great location for stargazing. Very quiet at night." },
          { spotId: 4, userId: 2, review: "Smelled like grandma’s attic. Nostalgic but not for everyone." },
          { spotId: 9, userId: 3, review: "I loved the vibe of the place, but the decor was a bit outdated." },
          { spotId: 6, userId: 4, review: "Mount Fuji view is incredible, but I wish there were more towels." },
          { spotId: 10, userId: 5, review: "Perfect for a quiet retreat. The bed was so comfortable!" },
          { spotId: 12, userId: 1, review: "Spacious and clean, but the neighbors were too noisy." },
          { spotId: 15, userId: 2, review: "Felt like I stepped into another dimension. Trippy and fun!" }
        ]
      },
      {}
    );
  }
};
