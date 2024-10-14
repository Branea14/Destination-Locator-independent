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
        foreignKey: 'userId',
        as: "User"
      })

      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        as: "Spot"
      })
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id"
      },
      onDelete: "CASCADE",
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Spot",
        key: "id"
      },
    onDelete: "CASCADE"
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
