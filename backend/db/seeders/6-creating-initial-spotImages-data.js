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
      { spotId: 4, url: "https://i.imgur.com/unfJfOH.jpeg", preview: true },
      { spotId: 4, url: "https://i.imgur.com/nx28p1Z.jpeg", preview: false },
      { spotId: 4, url: "https://i.imgur.com/lfo7Mcf.jpeg", preview: false},
      { spotId: 4, url: "https://i.imgur.com/55rxfTU.jpeg", preview: false},
      { spotId: 4, url: "https://i.imgur.com/sT8ccej.jpeg", preview: false},

      // Spot 5
      { spotId: 5, url: "https://i.imgur.com/tLgOqYJ.jpeg", preview: true },
      { spotId: 5, url: "https://i.imgur.com/DO1QPNR.jpeg", preview: false},
      { spotId: 5, url: "https://i.imgur.com/XuvwRn9.jpeg", preview: false},
      { spotId: 5, url: "hhttps://i.imgur.com/VRrthgP.jpeg", preview: false},
      { spotId: 5, url: "https://i.imgur.com/CmdspBX.jpeg", preview: false},

      // Spot 6
      { spotId: 6, url: "https://i.imgur.com/H1sKr9d.jpeg", preview: true },
      { spotId: 6, url: "https://i.imgur.com/1RnvwKD.jpeg", preview: false},
      { spotId: 6, url: "https://i.imgur.com/sRY0x7l.jpeg", preview: false},
      { spotId: 6, url: "https://i.imgur.com/B0h8wJE.jpeg", preview: false},
      { spotId: 6, url: "https://i.imgur.com/ZBTnbjW.jpeg", preview: false},

      // Spot 7
      { spotId: 7, url: "https://i.imgur.com/PvsJmYZ.png", preview: true },
      { spotId: 7, url: "https://i.imgur.com/ZM71wEu.png", preview: false},
      { spotId: 7, url: "https://i.imgur.com/dq98oP4.png", preview: false},
      { spotId: 7, url: "https://i.imgur.com/WGsWz25.png", preview: false},
      { spotId: 7, url: "https://i.imgur.com/66nK6Ih.png", preview: false},

      // Spot 8
      { spotId: 8, url: "https://i.imgur.com/j3WFXkC.png", preview: true },
      { spotId: 8, url: "https://i.imgur.com/n3YGjUn.png", preview: false},
      { spotId: 8, url: "https://i.imgur.com/fBzx6Pb.png", preview: false},
      { spotId: 8, url: "https://i.imgur.com/TmVvtJj.png", preview: false},
      { spotId: 8, url: "https://i.imgur.com/YPpqAWg.png", preview: false},

      // Spot 9
      { spotId: 9, url: "https://i.imgur.com/z6bkFqK.jpeg", preview: true },
      { spotId: 9, url: "https://i.imgur.com/KCYS6vs.png", preview: false},
      { spotId: 9, url: "https://i.imgur.com/hdMfpoI.jpeg", preview: false},
      { spotId: 9, url: "https://i.imgur.com/lB5f0GB.jpeg", preview: false},
      { spotId: 9, url: "https://i.imgur.com/9au71mX.jpeg", preview: false},

      // Spot 10
      { spotId: 10, url: "https://i.imgur.com/cnRsYcd.png", preview: true },
      { spotId: 10, url: "https://i.imgur.com/g7JpbMD.png", preview: false },
      { spotId: 10, url: "https://i.imgur.com/S7Ofn7A.png", preview: false },
      { spotId: 10, url: "https://i.imgur.com/RdBFwlV.png", preview: false},
      { spotId: 10, url: "https://i.imgur.com/Rd4NOxI.png", preview: false}

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
