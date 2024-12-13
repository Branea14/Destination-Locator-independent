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
    options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 1,
      address: "123 Starry Way",
      city: "Austin",
      state: "Texas",
      country: "United States of America",
      lat: 35.6895,
      lng: 139.6917,
      name: "Ghostly Retreat",
      price: 100.00,
      description: "A cozy, modern apartment near the bustling city center. Perfect for fans of ghostly tales!"
    },
    {
      ownerId: 1,
      address: "88 Spirit Lane",
      city: "Boulder",
      state: "Colorado",
      country: "United States of America",
      lat: 35.4437,
      lng: 139.6380,
      name: "Alien Hideaway",
      price: 85.00,
      description: "Unique space with quirky decor inspired by UFOs and extraterrestrials."
    },
    {
      ownerId: 1,
      address: "456 Omen Road",
      city: "Savannah",
      state: "Georgia",
      country: "United States of America",
      lat: 35.0116,
      lng: 135.7681,
      name: "Shrine Stay",
      price: 120.00,
      description: "Traditional Japanese home near ancient shrines. A spiritual experience awaits!"
    },
    {
      ownerId: 2,
      address: "22 Turbo Drive",
      city: "Madison",
      state: "Wisconsin",
      country: "United States of America",
      lat: 34.6937,
      lng: 135.5023,
      name: "Speedy Stay",
      price: 110.00,
      description: "Modern apartment with a tech-savvy theme and high-speed internet."
    },
    {
      ownerId: 2,
      address: "999 Astral Avenue",
      city: "Sedona",
      state: "Arizona",
      country: "United States of America",
      lat: 43.0618,
      lng:  141.3545,
      name: "UFO Den",
      price: 95.00,
      description: "A sleek, space-themed apartment ideal for adventurers and alien enthusiasts."
    },
    {
      ownerId: 2,
      address: "77 Speedster Street",
      city: "Portland",
      state: "Maine",
      country: "United States of America",
      lat: 35.1815,
      lng: 136.9066,
      name: "Turbo Haven",
      price: 105.00,
      description: "Spacious apartment with plenty of room to relax and enjoy the view."
    },
    {
      ownerId: 3,
      address: "300 Granny Trail",
      city: "Eugene",
      state: "Oregon",
      country: "United States of America",
      lat: 34.3853,
      lng: 132.4553,
      name: "Serene Garden Home",
      price: 90.00,
      description: "A peaceful, garden-themed house perfect for quiet getaways."
    },
    {
      ownerId: 3,
      address: "50 Vintage Lane",
      city: "Charleston",
      state: "South Carolina",
      country: "United States of America",
      lat: 34.6851,
      lng: 135.8048,
      name: "Retro Retreat",
      price: 100.00,
      description: "A charming house with vintage decor near Nara's famous deer park."
    },
    {
      ownerId: 3,
      address: "18 Heirloom Court",
      city: "Reno",
      state: "Nevada",
      country: "United States of America",
      lat: 34.6901,
      lng: 135.1956,
      name: "Time Traveler's Cottage",
      price: 120.00,
      description: "An antique-filled cottage with timeless charm and modern amenities."
    },
    {
      ownerId: 4,
      address: "456 Psychic Blvd",
      city: "Knoxville",
      state: "Tennessee",
      country: "United States of America",
      lat: 33.5902,
      lng: 130.4017,
      name: "Clairvoyant Condo",
      price: 80.00,
      description: "A tranquil space for those looking to unwind and tap into their inner energy."
    },
   ], {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      lat: {[Op.in]: [35.6895, 35.4437, 35.0116, 34.6937, 43.0618, 35.1815, 34.3853, 34.6851, 34.6901, 33.5902, 38.2682, 36.5944, 35.7023, 35.3606, 35.2329]}
    }, {})
  }
};
