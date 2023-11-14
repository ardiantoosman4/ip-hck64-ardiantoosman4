const midtransClient = require("midtrans-client");
const { Order, User } = require("../models");
class payController {
  static async placeOrderMidtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      const lastOrders = await Order.findAll({
        limit: 1,
        where: {
          UserId: req.user.id,
        },
        order: [["createdAt", "DESC"]],
      });
      const lastId = lastOrders.length > 0 ? lastOrders[0].id + 1 : 1;
      const order = await Order.create({
        orderId: `${lastId}`,
        UserId: req.user.id,
        orderTime: new Date(),
        price: 5000,
        paymentStatus: "pending", // pending | paid expired
      });
      let parameter = {
        transaction_details: {
          order_id: order.id,
          gross_amount: order.price,
        },
      };

      const response = await snap.createTransaction(parameter);
      // await order.update({
      // snapToken: response, token
      // })
      res.json(response);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = payController;
