require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pubController = require("./controllers/pubController");
const authController = require("./controllers/authController");

const authentication = require("./middlewares/authentication");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", authController.login);
app.post("/googleLogin", authController.googleLogin);
app.post("/register", authController.register);
// app.get("/movies", pubController.getMovies);

// app.use(authentication);
// app.post("/add-user", authController.addUser);

app.use(errorHandler);

module.exports = app;
