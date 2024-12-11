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
        lastName: 'Ayase'
      },
      {
        username: 'TurboFan',
        hashedPassword: bcrypt.hashSync('password2'),
        email: 'ken.takakura@dandadanbnb.com',
        firstName: "Ken",
        lastName: "Takakura"
      },
      {
        username: 'GrannyVibes',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'seiko.takakura@dandadanbnb.com',
        firstName: "Seiko",
        lastName: "Takakura"
      },
      {
        username: 'PsychicVision',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'aira.shiratori@dandadanbnb.com',
        firstName: "Aira",
        lastName: "Shiratori"
      },
      {
        username: 'TurboOkarun',
        hashedPassword: bcrypt.hashSync('password3'),
        email: 'okarun.okarun@dandadanbnb.com',
        firstName: "Okarun",
        lastName: "Okarun"
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
