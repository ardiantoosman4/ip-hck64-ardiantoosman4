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
      const order = await Order.create({
        order_id: `MT-${req.user.id}-${Date.now()}`,
        UserId: req.user.id,
        orderTime: new Date(),
        price: req.body.price,
        title: req.body.title,
        movie_id: req.body.movie_id,
        imgUrl: req.body.imgUrl,
        description: req.body.description,
        duration: req.body.duration,
        trailerUrl: req.body.trailerUrl,
        paymentStatus: "pending", // pending | paid expired
      });
      let parameter = {
        transaction_details: {
          order_id: order.order_id,
          gross_amount: order.price,
        },
      };

      const response = await snap.createTransaction(parameter);
      await Order.update(
        { snapToken: response.token },
        { where: { order_id: order.order_id } }
      );
      res.status(200).json(response);
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
          { paymentStatus: "success" },
          {
            where: { order_id: order_id },
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
          { paymentStatus: "failed" },
          { where: { order_id: order_id } }
        );
      }
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = payController;
