'use strict';
const {
  Model, Validator,
  Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

      User.hasMany(models.Review, {
        foreignKey: 'userId',
        as: 'UserReviews',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
      });

      User.hasMany(models.Booking, {
        foreignKey: "userId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
      });

      User.hasMany(models.Spot, {
        foreignKey: "ownerId",
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        hooks: true
      })


    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      // validate: {
      //   isAlphanumeric: true
      // }
    },
    lastName: {
      type: DataTypes.STRING,
      // validate: {
      //   isAlphanumeric: true
      // }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email')
          }
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
