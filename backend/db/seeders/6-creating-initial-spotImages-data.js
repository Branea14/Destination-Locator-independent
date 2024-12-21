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
      { spotId: 1, url: "https://i.imgur.com/ao7kudY.jpeg", preview: true },
      { spotId: 1, url: "https://i.imgur.com/XlIl6jj.jpeg", preview: false },
      { spotId: 1, url: "https://i.imgur.com/102Cwlo.jpeg", preview: false },
      { spotId: 1, url: "https://i.imgur.com/DqKfuIK.jpeg", preview: false },
      { spotId: 1, url: "https://i.imgur.com/0qjnX8E.jpeg", preview: false },

      // Spot 2
      { spotId: 2, url: "https://i.imgur.com/dasVxkE.png", preview: true },
      { spotId: 2, url: "https://i.imgur.com/qFBXftF.png", preview: false },
      { spotId: 2, url: "https://i.imgur.com/LiuzF3q.png", preview: false},
      { spotId: 2, url: "https://i.imgur.com/J98dx3e.png", preview: false},
      { spotId: 2, url: "https://i.imgur.com/9v9qEEV.png", preview: false},

      // Spot 3
      { spotId: 3, url: "https://imgur.com/UoxsN5x.jpeg", preview: true },
      { spotId: 3, url: "https://imgur.com/DGQoigg.jpeg", preview: false },
      { spotId: 3, url: "https://imgur.com/CGkoJVN.jpeg", preview: false },
      { spotId: 3, url: "https://imgur.com/GhfBnBi.jpeg", preview: false },
      { spotId: 3, url: "https://imgur.com/DR0i3D0.jpeg", preview: false},

      // Spot 4
      { spotId: 4, url: "https://ibb.co/fSMzfL7.jpeg", preview: true },
      { spotId: 4, url: "https://ibb.co/QD959J3.jpeg", preview: false },
      { spotId: 4, url: "https://ibb.co/Rg8pjCd.jpeg", preview: false},
      { spotId: 4, url: "https://ibb.co/CVjmfFw.jpeg", preview: false},
      { spotId: 4, url: "https://ibb.co/5jgSf8K.jpeg", preview: false},

//       https://ibb.co/fSMzfL7
// https://ibb.co/QD959J3
// https://ibb.co/Rg8pjCd
// https://ibb.co/CVjmfFw
// https://ibb.co/5jgSf8K

      // Spot 5
      { spotId: 5, url: "https://cdn.openart.ai/uploads/image_BkvJDcGJ_1733898521284_512.webp", preview: true },
      { spotId: 5, url: "https://cdn.openart.ai/uploads/image_BLkp1lCS_1733897440904_512.webp", preview: false},
      { spotId: 5, url: "https://i.imgur.com/f2ETfRX.jpeg", preview: false},
      { spotId: 5, url: "https://i.imgur.com/yCeDETj.jpeg", preview: false},
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
    options.tableName = "SpotImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
     spotId: {[Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
    }, {})
  }
};
