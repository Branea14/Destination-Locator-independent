'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Spots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false

      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lat: {
        type: Sequelize.DECIMAL,
        // unique: true
      },
      lng: {
        type: Sequelize.DECIMAL,
        // unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      // description: {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      // avgRating: {
      //   type: Sequelize.DECIMAL(2, 1),
      //   allowNull: true
      // },
      // previewImage: {
      //   type: Sequelize.STRING
      // },
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
        `TRUNCATE TABLE ${options.schema ? `"${options.schema}"."Spots"` : "Spots"} RESTART IDENTITY CASCADE;`
      );
    } else if (process.env.NODE_ENV === "development") {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE "Spots_id_seq" RESTART WITH 1;`
      );
    }
  },
  async down(queryInterface, Sequelize) {
    if (process.env.NODE_ENV === "production") {
      await queryInterface.sequelize.query(
        `TRUNCATE TABLE ${options.schema ? `"${options.schema}"."Spots"` : "Spots"} RESTART IDENTITY CASCADE;`
      );
    } else if (process.env.NODE_ENV === "development") {
      await queryInterface.sequelize.query(
        `ALTER SEQUENCE "Spots_id_seq" RESTART WITH 1;`
      );
    }
    await queryInterface.dropTable("Spots", options);
  }
};
