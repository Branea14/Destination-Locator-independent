'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA;
}

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
   await queryInterface.addColumn(options.tableName, "firstName",{
    type: Sequelize.STRING,
   }, options)
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable(options.tableName);
  }
};
