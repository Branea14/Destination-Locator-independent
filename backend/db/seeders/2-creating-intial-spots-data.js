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
      address: "1313 Wisp Way",
      city: "Spectra City",
      state: "Phantasia",
      country: "Ethereal Union",
      lat: 35.6895,
      lng: 139.6917,
      name: "The Ethereal Haven",
      price: 100.00,
      description: "A cozy, modern apartment near the bustling city center. Perfect for fans of ghostly tales!"
    },
    {
      ownerId: 1,
      address: "42 Orbit Lane",
      city: "Nebula Heights",
      state: "Andromeda Province",
      country: "Zeta Star Federation",
      lat: 35.4437,
      lng: 139.6380,
      name: "The Cosmic Abode",
      price: 85.00,
      description: "Unique space with quirky decor inspired by UFOs and extraterrestrials."
    },
    {
      ownerId: 1,
      address: "88 Serenity Path",
      city: "Kiyomizu Village",
      state: "Harmonia Prefecture",
      country: "Shinkoku Isles",
      lat: 35.0116,
      lng: 135.7681,
      name: "The Sakura Retreat",
      price: 120.00,
      description: "Traditional Japanese home near ancient shrines. A spiritual experience awaits!"
    },
    {
      ownerId: 2,
      address: "101 Digital Drive",
      city: "Byte City",
      state: "NeoConnect Province",
      country: "Cyberlink Federation",
      lat: 34.6937,
      lng: 135.5023,
      name: "The Tech Haven",
      price: 110.00,
      description: "Modern apartment with a tech-savvy theme and high-speed internet."
    },
    {
      ownerId: 2,
      address: "42 Cosmic Orbit Lane",
      city: "Stellar Horizon",
      state: "Nebula Province",
      country: "Celestara Federation",
      lat: 43.0618,
      lng:  141.3545,
      name: "The Galactic Sanctuary",
      price: 95.00,
      description: "A sleek, space-themed apartment ideal for adventurers and alien enthusiasts."
    },
    {
      ownerId: 2,
      address: "15 Horizon View Lane",
      city: "Vista Heights",
      state: "Horizon County",
      country: "Terranova Republic",
      lat: 35.1815,
      lng: 136.9066,
      name: "The Panorama Residence",
      price: 105.00,
      description: "Spacious apartment with plenty of room to relax and enjoy the view."
    },
    {
      ownerId: 3,
      address: "27 Serenity Garden Path",
      city: "Willow Haven",
      state: "Verdantia",
      country: "Florae Union",
      lat: 34.3853,
      lng: 132.4553,
      name: "The Blossom Retreat",
      price: 90.00,
      description: "A peaceful, garden-themed house perfect for quiet getaways."
    },
    {
      ownerId: 3,
      address: "8 Harmony Lane",
      city: "Nara Serenity",
      state: "Kansai Prefecture",
      country: "Japan",
      lat: 34.6851,
      lng: 135.8048,
      name: "Retro Retreat",
      price: 100.00,
      description: "A charming house with vintage decor near Nara's famous deer park."
    },
    {
      ownerId: 3,
      address: "19 Timeless Way",
      city: "Lumos Hollow",
      state: "Antiqua Province",
      country: "Evermore Realm",
      lat: 34.6901,
      lng: 135.1956,
      name: "Time Traveler's Cottage",
      price: 120.00,
      description: "An antique-filled cottage with timeless charm and modern amenities."
    },
    {
      ownerId: 4,
      address: "33 Serenity Flow",
      city: "Etherea Falls",
      state: "Zenith Province",
      country: "Luminara Dimension",
      lat: 33.5902,
      lng: 130.4017,
      name: "The Celestial Sanctuary",
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
