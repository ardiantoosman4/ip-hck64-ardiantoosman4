"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bycrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email format is not valid!",
          },
          notNull: {
            msg: "Email is required!",
          },
          notEmpty: {
            msg: "Email is required!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required!",
          },
          notEmpty: {
            msg: "Password is required!",
          },
          minLen(value) {
            if (value.length < 5) {
              throw new Error("Password length must be 5 or greater!");
            }
          },
        },
      },
      balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.addHook("beforeCreate", (instance) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
