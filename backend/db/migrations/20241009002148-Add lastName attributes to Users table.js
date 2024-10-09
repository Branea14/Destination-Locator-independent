'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
options.schema = process.env.SCHEMA;
}
options.tableName = "Users";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING
    }, options)
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Users";
    await queryInterface.dropTable(options);
  }
};
