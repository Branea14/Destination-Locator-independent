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
      Booking.hasMany(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      })
    }
  }
  Booking.init({
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        // isBefore: endDate
        validStartDate(value) {
          console.log(this.endDate)
          if (!this.endDate) {
              throw new Error("End date is required to validate start date.")
          }
          const unixStartDate = Math.floor(new Date(value).getTime()/1000);
          const unixEndDate = Math.floor(new Date(this.endDate).getTime()/1000)
          if (unixStartDate > unixEndDate) {
            throw new Error('Start date must be before the end date.');
          }
      }
    }
  },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        // isAfter: startDate
        validEndDate(value) {
          if (!this.startDate) {
            throw new Error("The start date is required to validate the end date.")
          }
          const unixEndDate = Math.floor(new Date(value).getTime()/1000)
          const unixStartDate = Math.floor(new Date(this.startDate).getTime()/1000);
          if (unixStartDate > unixEndDate) {
            throw new Error('End date must be after the start date.');
          }
      }
      }
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};