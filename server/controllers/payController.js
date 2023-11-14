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

  static async payOrderMidtrans(req, res, next) {
    try {
      const { transaction_status, fraud_status, order_id } = req.body;
      const successProcess = async () => {
        const result = await Order.update(
          {
            status: "success",
          },
          {
            where: {
              id: order_id,
            },
            returning: true,
          }
        );
      };

      if (transaction_status == "capture") {
        if (fraud_status == "accept") {
          // TODO set transaction status on your database to 'success' // and response with 200 OK
          await successProcess();
        }
      } else if (transaction_status == "settlement") {
        // TODO set transaction status on your database to 'success' // and response with 200 OK
        await successProcess();
      } else if (
        transaction_status == "cancel" ||
        transaction_status == "deny" ||
        transaction_status == "expire"
      ) {
        // TODO set transaction status on your database to 'failure' // and response with 200 OK
        await Order.update(
          {
            status: "failed",
          },
          {
            where: {
              id: order_id,
            },
          }
        );
      }
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = payController;
