'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        isNumeric: true,
        min: 1
      }
    },
    spotId: {
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        isNumeric: true,
        min: 1
      }
    },
    review: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1,1],
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
