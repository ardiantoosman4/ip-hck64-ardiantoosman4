"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "UserId is required!",
          },
          notEmpty: {
            msg: "UserId is required!",
          },
        },
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "order_id is required!",
          },
          notEmpty: {
            msg: "order_id is required!",
          },
        },
      },
      snapToken: DataTypes.STRING,
      orderTime: DataTypes.DATE,
      paymentStatus: { type: DataTypes.STRING, defaultValue: "pending" },
      title: DataTypes.STRING,
      imgUrl: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
      duration: { type: DataTypes.INTEGER, defaultValue: 0 },
      trailerUrl: DataTypes.TEXT("long"),
      price: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
