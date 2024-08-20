'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Digimon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Digimon.hasMany(models.User)
    }
  }
  Digimon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "name has required"
        },
        notEmpty: {
          msg: "name has required"
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "image has required"
        },
        notEmpty: {
          msg: "image has required"
        }
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "level has required"
        },
        notEmpty: {
          msg: "level has required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Digimon',
  });
  return Digimon;
};