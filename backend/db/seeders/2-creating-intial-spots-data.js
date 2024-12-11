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
      city: "Tokyo",
      state: "Tokyo Prefecture",
      country: "Japan",
      lat: 35.6895,
      lng: 139.6917,
      name: "Ghostly Retreat",
      price: 100.00,
      description: "A cozy, modern apartment near the bustling city center. Perfect for fans of ghostly tales!"
    },
    {
      ownerId: 1,
      address: "88 Spirit Lane",
      city: "Yokohama",
      state: "Kanagawa",
      country: "Japan",
      lat: 35.4437,
      lng: 139.6380,
      name: "Alien Hideaway",
      price: 85.00,
      description: "Unique space with quirky decor inspired by UFOs and extraterrestrials."
    },
    {
      ownerId: 1,
      address: "456 Omen Road",
      city: "Kyoto",
      state: "Kyoto Prefecture",
      country: "Japan",
      lat: 35.0116,
      lng: 135.7681,
      name: "Shrine Stay",
      price: 120.00,
      description: "Traditional Japanese home near ancient shrines. A spiritual experience awaits!"
    },
    {
      ownerId: 2,
      address: "22 Turbo Drive",
      city: "Osaka",
      state: "Osaka Prefecture",
      country: "Japan",
      lat: 34.6937,
      lng: 135.5023,
      name: "Speedy Stay",
      price: 110.00,
      description: "Modern apartment with a tech-savvy theme and high-speed internet."
    },
    {
      ownerId: 2,
      address: "999 Astral Avenue",
      city: "Sapporo",
      state: "Hokkaido",
      country: "Japan",
      lat: 43.0618,
      lng:  141.3545,
      name: "UFO Den",
      price: 95.00,
      description: "A sleek, space-themed apartment ideal for adventurers and alien enthusiasts."
    },
    {
      ownerId: 2,
      address: "77 Speedster Street",
      city: "Nagoya",
      state: "Aichi Prefecture",
      country: "Japan",
      lat: 35.1815,
      lng: 136.9066,
      name: "Turbo Haven",
      price: 105.00,
      description: "Spacious apartment with plenty of room to relax and enjoy the view."
    },
    {
      ownerId: 3,
      address: "300 Granny Trail",
      city: "Hiroshima",
      state: "Hiroshima Prefecture",
      country: "Japan",
      lat: 34.3853,
      lng: 132.4553,
      name: "Serene Garden Home",
      price: 90.00,
      description: "A peaceful, garden-themed house perfect for quiet getaways."
    },
    {
      ownerId: 3,
      address: "50 Vintage Lane",
      city: "Nara",
      state: "Nara Prefecture",
      country: "Japan",
      lat: 34.6851,
      lng: 135.8048,
      name: "Retro Retreat",
      price: 100.00,
      description: "A charming house with vintage decor near Nara's famous deer park."
    },
    {
      ownerId: 3,
      address: "18 Heirloom Court",
      city: "Kobe",
      state: "Hyogo Prefecture",
      country: "Japan",
      lat: 34.6901,
      lng: 135.1956,
      name: "Time Traveler's Cottage",
      price: 120.00,
      description: "An antique-filled cottage with timeless charm and modern amenities."
    },
    {
      ownerId: 4,
      address: "456 Psychic Blvd",
      city: "Fukuoka",
      state: "Fukuoka Prefecture",
      country: "Japan",
      lat: 33.5902,
      lng: 130.4017,
      name: "Clairvoyant Condo",
      price: 80.00,
      description: "A tranquil space for those looking to unwind and tap into their inner energy."
    },
    {
      ownerId: 4,
      address: "123 Vision Road",
      city: "Sendai",
      state: "Miyagi Prefecture",
      country: "Japan",
      lat: 38.2682,
      lng: 140.8694,
      name: "Dreamer's Loft",
      price: 90.00,
      description: "An airy loft with inspiring views and meditative decor."
    },
    {
      ownerId: 4,
      address: "789 ESP Avenue",
      city: "Kanazawa",
      state: "Ishikawa Prefecture",
      country: "Japan",
      lat: 36.5944,
      lng: 136.6256,
      name: "Intuition Inn",
      price: 85.00,
      description: "A serene inn with calming energy, perfect for a mindful retreat."
    },
    {
      ownerId: 5,
      address: "77 Mystery Alley",
      city: "Akihabara",
      state: "Tokyo Prefecture",
      country: "Japan",
      lat: 35.7023,
      lng: 139.7745,
      name: "Hidden Base",
      price: 95.00,
      description: "A secretive and fun stay near the anime and manga capital of Japan."
    },
    {
      ownerId: 5,
      address: "202 Turbo St",
      city: "Fuji",
      state: "Shizuoka Prefecture",
      country: "Japan",
      lat: 35.3606,
      lng: 138.7274,
      name: "Viewpoint Villa",
      price: 130.00,
      description: "Scenic villa with stunning views of Mount Fuji, great for adventurers."
    },
    {
      ownerId: 5,
      address: "11 Parallel Lane",
      city: "Hakone",
      state: "Kanagawa Prefecture",
      country: "Japan",
      lat: 35.2329,
      lng: 139.1066,
      name: "Dimensional Dorm",
      price: 110.00,
      description: "Unique dorm-style lodging inspired by alternate dimensions."
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
