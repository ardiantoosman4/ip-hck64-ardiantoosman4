const { User, Order } = require("../models");
const midtransClient = require("midtrans-client");

class profileController {
  static async getOrder(req, res, next) {
    try {
      let userId = req.user.id;
      let data = await Order.findAll({
        where: {
          UserId: userId,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let id = req.params.OrderId;
      let order = await Order.findByPk(id);
      if (!order) {
        throw { name: "notFound", id };
      }

      snap.transaction
        .cancel(order.order_id)
        .then(async (response) => {
          await Order.destroy({ where: { id } });
          res.status(200).json(order);
        })
        .catch(function () {
          next({ name: "midtransCancel" });
        });
    } catch (error) {
      next(error);
    }
  }
  static async getOrderById(req, res, next) {
    try {
      let id = req.params.OrderId;
      let order = await Order.findByPk(id);
      if (!order) {
        throw { name: "notFound", id };
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = profileController;
