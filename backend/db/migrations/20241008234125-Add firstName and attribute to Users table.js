'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA;
}
options.tableName = "Users";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
   await queryInterface.addColumn("Users", "firstName",{
    type: Sequelize.STRING,
   }, options)
  },

  async down (queryInterface, _Sequelize) {
    options.tableName = "Users";
    await queryInterface.dropTable(options);
  }
};
