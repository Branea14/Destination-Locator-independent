'use strict';
const { query } = require("express");
const {Spot} = require("../models");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await Spot.bulkCreate([
    {
      ownerId: 1,
      address: "4858 Elmhurst Ave",
      city: "Memphis",
      state: "TN",
      country: "United States of America",
      lat: 28.0825,
      lon: -155.24578,
      name: "Country Cabin Near Beale St",
      price: 68,
      avgRating: 4.8,
      previewImage: "http://cabinimage.com",      
      description: "A cute wooden cabin near Beale St."

    },
    {
      ownerId: 2,
      address: "2331 Cathedral Dr",
      city: "Minneapolis",
      state: "MN",
      country: "United States of America",
      lat: 50.101019,
      lon: -18.101882,
      name: "High rise near metropolitan area",
      price: 152,
      avgRating: 4.3,
      previewImage: "http://skylineview.com",      
      description: "High rise near the Arts District."
    },
    {
      ownerId: 3,
      address: "1991 Washington Ave",
      city: "Las Vegas",
      state: "NV",
      country: "United States of America",
      lat: 100.124124,
      lon: -101.11919,
      name: "Condo near the Strip",
      price: 128,
      avgRating: 4.9,
      previewImage: "http://viewofvegasstrip.com",      
      description: "Lively night life and clean stay."
    }
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      lat: {[Op.in]: [28.0825, 50.101019, 100.124124]}
    }, {})
  }
};
