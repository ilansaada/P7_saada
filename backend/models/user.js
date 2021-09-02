'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message),
      models.User.hasMany(models.Comment)
    }
  };
   User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          is: /^[^@]+@[^@]+\.[^@]+$/,
          notEmpty: true
        },
      },
      password: {
        type :DataTypes.STRING,
        validate: {
          notEmpty: true
        },
      },
      isAdmin: {
        type :DataTypes.BOOLEAN,
        defaultValue: false
      ,
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};