'use strict';
const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      // Spot 1
      { spotId: 1, url: "https://images.pexels.com/photos/29677946/pexels-photo-29677946/free-photo-of-modern-geometric-apartment-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 1, url: "https://images.pexels.com/photos/27490330/pexels-photo-27490330/free-photo-of-a-city-street-with-tall-buildings-and-a-street-sign.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 1, url: "https://images.pexels.com/photos/4067759/pexels-photo-4067759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 1, url: "https://images.pexels.com/photos/6177607/pexels-photo-6177607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 1, url: "https://images.pexels.com/photos/626163/pexels-photo-626163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },

      // Spot 2
      { spotId: 2, url: "https://images.pexels.com/photos/23024072/pexels-photo-23024072/free-photo-of-yokohama-waterfront-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 2, url: "https://images.pexels.com/photos/6070061/pexels-photo-6070061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },

      // Spot 3
      { spotId: 3, url: "https://images.pexels.com/photos/327483/pexels-photo-327483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 3, url: "https://images.pexels.com/photos/739074/pexels-photo-739074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 3, url: "https://images.pexels.com/photos/1413833/pexels-photo-1413833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 3, url: "https://images.pexels.com/photos/5472597/pexels-photo-5472597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },

      // Spot 4
      { spotId: 4, url: "https://images.pexels.com/photos/29696169/pexels-photo-29696169/free-photo-of-minimalist-living-room-with-indoor-plants.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 4, url: "https://images.pexels.com/photos/5644745/pexels-photo-5644745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },


      // Spot 5
      { spotId: 5, url: "https://images.pexels.com/photos/19127190/pexels-photo-19127190/free-photo-of-photo-of-a-street-in-sapporo-japan.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },

      // Spot 6
      { spotId: 6, url: "https://images.pexels.com/photos/19046832/pexels-photo-19046832/free-photo-of-cyclist-on-sidewalk-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },

      // Spot 7
      { spotId: 7, url: "https://images.pexels.com/photos/8193014/pexels-photo-8193014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },

      // Spot 8
      { spotId: 8, url: "https://images.pexels.com/photos/6249415/pexels-photo-6249415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },

      // Spot 9
      { spotId: 9, url: "https://images.pexels.com/photos/17274539/pexels-photo-17274539/free-photo-of-cityscape-of-kobe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },

      // Spot 10
      { spotId: 10, url: "https://images.pexels.com/photos/5846615/pexels-photo-5846615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 11, url: "https://images.pexels.com/photos/29696164/pexels-photo-29696164/free-photo-of-modern-scandinavian-living-room-interior-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 12, url: "https://images.pexels.com/photos/18810867/pexels-photo-18810867/free-photo-of-a-building-by-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 13, url: "https://images.pexels.com/photos/5846615/pexels-photo-5846615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 14, url: "https://images.pexels.com/photos/5846615/pexels-photo-5846615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 15, url: "https://images.pexels.com/photos/5846615/pexels-photo-5846615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
     spotId: {[Op.in]: [1, 2, 3]}
    }, {})
  }
};
