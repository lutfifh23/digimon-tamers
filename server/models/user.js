'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Digimon, { foreignKey: 'DigimonId' })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'username has required'
        },
        notEmpty: {
          msg: 'username has required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'email has required'
        },
        notEmpty: {
          msg: 'email has required'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'password has required'
        },
        notEmpty: {
          msg: 'password has required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    DigimonId: {
      type: DataTypes.INTEGER,
    }
  }, {
    hooks: {
      beforeCreate(instance, option) {
        const hashedPassword = hashPassword(instance.password)
        instance.password = hashedPassword
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};