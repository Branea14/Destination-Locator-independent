'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
   await queryInterface.addColumn("Users", "firstName",{
    type: Sequelize.STRING,
    allowNull: false,
   })
  },

  async down (queryInterface, _Sequelize) {
   await queryInterface.removeColumn("Users", "firstName")
  }
};
