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
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
    }
  }
  Review.init({
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
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
