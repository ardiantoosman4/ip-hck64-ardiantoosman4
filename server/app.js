if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const payController = require("./controllers/payController");
const authController = require("./controllers/authController");
const profileController = require("./controllers/profileController");

const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TENFLIX SERVER IS RUNNING");
});
app.post("/login", authController.login);
app.post("/googleLogin", authController.googleLogin);
app.post("/register", authController.register);
// app.get("/movies", pubController.getMovies);

app.post("/midtrans/payment", payController.payOrderMidtrans);
app.use(authentication);
app.post("/midtrans/token", payController.placeOrderMidtrans);
app.get("/my-profile", profileController.getOrder);
app.delete("/my-profile/order/:OrderId", profileController.deleteOrder);
app.get("/my-profile/order/:OrderId", profileController.getOrderById);

app.use(errorHandler);

module.exports = app;
