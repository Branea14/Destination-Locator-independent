'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        min: 1,
        isInt: true
      }
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isBefore: endDate
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isAfter: startDate
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
