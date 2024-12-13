'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        as: "User",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: "Spot",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hook: true
      })
    }
  }
  Review.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Spots",
        key: "id"
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      },
    },
    review: {
      type: DataTypes.STRING,
    },
    stars: {
      type: DataTypes.INTEGER,
      validate: {
        len: [1,1],
        // min: 1,
        // max: 5,
        isInt: true
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
