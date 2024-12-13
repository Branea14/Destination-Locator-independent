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
      { spotId: 1, url: "https://cdn.openart.ai/uploads/image_wRWo1tTm_1733898794342_raw.jpg", preview: false },

      // Spot 2
      { spotId: 2, url: "https://images.pexels.com/photos/23024072/pexels-photo-23024072/free-photo-of-yokohama-waterfront-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 2, url: "https://images.pexels.com/photos/6070061/pexels-photo-6070061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 2, url: "https://cdn.openart.ai/uploads/image_FyW3SmaE_1733897892895_raw.jpg", preview: false},
      { spotId: 2, url: "https://i.imgur.com/DQAow5H.jpeg", preview: false},
      { spotId: 2, url: "https://i.imgur.com/5F1P5Aj.jpeg", preview: false},

      // Spot 3
      { spotId: 3, url: "https://images.pexels.com/photos/327483/pexels-photo-327483.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 3, url: "https://images.pexels.com/photos/739074/pexels-photo-739074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 3, url: "https://cdn.openart.ai/uploads/image_m2BkxdcN_1733898016937_raw.jpg", preview: false },
      { spotId: 3, url: "https://images.pexels.com/photos/5472597/pexels-photo-5472597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotid: 3, url: "https://i.imgur.com/43cPQ0X.jpeg", preview: false},

      // Spot 4
      { spotId: 4, url: "https://images.pexels.com/photos/29696169/pexels-photo-29696169/free-photo-of-minimalist-living-room-with-indoor-plants.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 4, url: "https://images.pexels.com/photos/5644745/pexels-photo-5644745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 4, url: "https://cdn.openart.ai/uploads/image_piNhAu5A_1733898643991_raw.jpg", preview: false},
      { spotId: 4, url: "https://i.imgur.com/3ysAXSv.jpeg", preview: false},
      { spotId: 4, url: "https://i.imgur.com/CFU9sSv.jpeg", preview: false},


      // Spot 5
      { spotId: 5, url: "https://cdn.openart.ai/uploads/image_BkvJDcGJ_1733898521284_512.webp", preview: true },
      { spotId: 5, url: "https://cdn.openart.ai/uploads/image_BLkp1lCS_1733897440904_512.webp", preview: false},
      { spotId: 5, url: "https://i.imgur.com/f2ETfRX.jpeg", preview: false},
      { spotid: 5, url: "https://i.imgur.com/yCeDETj.jpeg", preview: false},
      { spotId: 5, url: "https://i.imgur.com/3KTVi1f.jpeg", preview: false},

      // Spot 6
      { spotId: 6, url: "https://images.pexels.com/photos/19046832/pexels-photo-19046832/free-photo-of-cyclist-on-sidewalk-in-city.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 6, url: "https://i.imgur.com/skQk4AZ.jpeg", preview: false},
      { spotId: 6, url: "https://i.imgur.com/33HYXzY.jpeg", preview: false},
      { spotId: 6, url: "https://i.imgur.com/SG4By4V.jpeg", preview: false},
      { spotId: 6, url: "https://i.imgur.com/3ysAXSv.jpeg", preview: false},

      // Spot 7
      { spotId: 7, url: "https://images.pexels.com/photos/8193014/pexels-photo-8193014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 7, url: "https://i.imgur.com/bUgY6Ak.jpeg", preview: false},
      { spotId: 7, url: "https://i.imgur.com/R4VkASY.jpeg", preview: false},
      { spotId: 7, url: "https://i.imgur.com/qMI3jPw.jpeg", preview: false},
      { spotId: 7, url: "https://i.imgur.com/hkYmuTE.jpeg", preview: false},

      // Spot 8
      { spotId: 8, url: "https://images.pexels.com/photos/6249415/pexels-photo-6249415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 8, url: "https://i.imgur.com/cjegv5y.jpeg", preview: false},
      { spotId: 8, url: "https://i.imgur.com/f2ETfRX.jpeg", preview: false},
      { spotId: 8, url: "https://i.imgur.com/yCeDETj.jpeg", preview: false},
      { spotId: 8, url: "https://i.imgur.com/3KTVi1f.jpeg", preview: false},

      // Spot 9
      { spotId: 9, url: "https://images.pexels.com/photos/17274539/pexels-photo-17274539/free-photo-of-cityscape-of-kobe.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 9, url: "https://i.imgur.com/oLug0yN.jpeg", preview: false},
      { spotId: 9, url: "https://i.imgur.com/skQk4AZ.jpeg", preview: false},
      { spotId: 9, url: "https://i.imgur.com/33HYXzY.jpeg", preview: false},
      { spotId: 9, url: "https://i.imgur.com/SG4By4V.jpeg", preview: false},

      // Spot 10
      { spotId: 10, url: "https://images.pexels.com/photos/5846615/pexels-photo-5846615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: true },
      { spotId: 10, url: "https://images.pexels.com/photos/29696164/pexels-photo-29696164/free-photo-of-modern-scandinavian-living-room-interior-design.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 10, url: "https://images.pexels.com/photos/18810867/pexels-photo-18810867/free-photo-of-a-building-by-a-lake.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", preview: false },
      { spotId: 10, url: "https://i.imgur.com/wuYgbcO.jpeg", preview: false},
      { spotId: 10, url: "https://i.imgur.com/tiEeCdJ.jpeg", preview: false}

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
