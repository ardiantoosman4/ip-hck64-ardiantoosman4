const { User, Order } = require("../models");

class profileController {
  static async getOrder(req,res,next){
    try {
      let userId  = req.user.id;
      let data = await Order.findAll({
        where:{
          UserId:userId
        }
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  static async deleteOrder(req,res,next){
    try {
      let orderId = req.params.orderId
      let order = await Order.findByPk(orderId);
      if (!order) {
        throw { name: "notFound", orderId };
      }

      await Order.destroy({ where: { id:orderId } });
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
  static async updateOrder(req,res,next){

  }
}
module.exports = profileController;
