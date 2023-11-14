const { User, Order } = require("../models");
const { createToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bycrypt");
const { OAuth2Client } = require("google-auth-library");

class authController {
  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      let data = await User.create({
        email,
        password,
      });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      // check input
      if (!email) {
        throw { name: "invalidLoginInput", field: "Email" };
      }
      if (!password) {
        throw { name: "invalidLoginInput", field: "Password" };
      }
      // check email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "unauthorized" };
      }
      // compare password
      if (!comparePassword(password, user.password)) {
        throw { name: "unauthorized" };
      }
      // create token
      const token = createToken({ id: user.id });
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { googleToken } = req.body;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const { email, sub } = ticket.getPayload();
      let user = await User.findOne({ where: { email } });
      if (!user) {
        // create
        user = await User.create(
          {
            email,
            password: sub,
          },
          {
            hooks: false,
          }
        );
      }
      const token = createToken({ id: user.id });
      res.status(200).json({ access_token: token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = authController;
