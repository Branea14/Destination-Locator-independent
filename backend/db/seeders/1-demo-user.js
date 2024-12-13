'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
options.tableName = "Users";
module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'demo@user.io',
        firstName: 'Momo',
        lastName: 'Aya'
      },
      {
        username: 'TurboFan',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'ken.taka@user.com',
        firstName: "Ken",
        lastName: "Taka"
      },
      {
        username: 'GrannyVibes',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'seiko.taka@user.com',
        firstName: "Seiko",
        lastName: "Taka"
      },
      {
        username: 'PsychicVision',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'aira.shira@user.com',
        firstName: "Aira",
        lastName: "Shira"
      },
      {
        username: 'TurboRun',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'okami.run@user.com',
        firstName: "Okami",
        lastName: "Run"
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'TurboFan', 'GrannyVibes', 'PsychicVision', 'TurboOkarun'] }
    }, {});
  }
};
