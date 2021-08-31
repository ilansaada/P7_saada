"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      models.User.hasMany(models.Message),
      models.User.hasMany(models.Comment)
      
    }
  }
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
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,  /*Minimum huit caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial :*/
          notEmpty: true
        },
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
