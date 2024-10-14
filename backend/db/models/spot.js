'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      });

      Spot.belongsTo(models.Booking, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    // Should be assigned an ownerId if the user is owner
    ownerId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [2,2]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lat: {
      type: DataTypes.DECIMAL(10,7),
      unique: true,
      validate: {
        isDecimal: true
      }
    },
    lng: {
      type: DataTypes.DECIMAL(10,7),
      unique: true,
      validate: {
        isDecimal: true
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
        min: 3
      }
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },
    avgRating: {
      type: DataTypes.DECIMAL(2,1),
      allowNull: true,
      validate: {
        // isDecimal: true,
        isInt: true
      }
    },
    previewImage: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
    }
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
