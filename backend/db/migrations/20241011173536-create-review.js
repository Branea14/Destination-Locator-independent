'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Spots",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      review: {
        type: Sequelize.STRING,
        allowNull: true
      },
      stars: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options, {});
    if (process.env.NODE_ENV === "production") {
      await queryInterface.sequelize.query(
        `TRUNCATE TABLE ${options.schema ? `"${options.schema}"."Reviews"` : "Reviews"} RESTART IDENTITY CASCADE;`
      );
    } else if (process.env.NODE_ENV === "development") {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE "Reviews_id_seq" RESTART WITH 1;`
      );
    }
  },
  async down(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === "production") {
      await queryInterface.sequelize.query(
        `TRUNCATE TABLE ${options.schema ? `"${options.schema}"."Reviews"` : "Reviews"} RESTART IDENTITY CASCADE;`
      );
    } else if (process.env.NODE_ENV === "development") {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE "Reviews_id_seq" RESTART WITH 1;`
      );
    }
    await queryInterface.dropTable("Reviews", options);
  }
};
