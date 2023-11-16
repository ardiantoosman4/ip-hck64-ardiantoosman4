const request = require("supertest");
const app = require("../app");
const { User, Order } = require("../models");
const getToken = require("../helpers/getToken");
let userToken;
beforeAll(async () => {
  let data = {
    email: "admin@mail.com",
    password: "admin",
  };
  await User.create(data);
  userToken = await getToken("admin@mail.com", "admin");
});
beforeEach(async () => {
  let data = {
    price: 100,
    title: "asd",
    movie_id: 1,
    imgUrl: "jkjlk",
    description: "qweqwe",
    duration: 0,
  };
  await request(app)
    .post("/midtrans/token")
    .send(data)
    .set("authorization", userToken);
});
afterEach(async () => {
  await Order.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});
afterAll(async () => {
  await User.destroy({ truncate: true, restartIdentity: true, cascade: true });
});

describe("post /midtrans/payment", () => {
  test("Success trans status capture fraud accept", async () => {
    let order = await Order.findByPk(1);
    let data = {
      transaction_status:"capture",
      fraud_status:"accept", 
      order_id:order.order_id
    };
    let response = await request(app)
      .post("/midtrans/payment")
      .send(data)
      .set("authorization", userToken);
    expect(response.status).toBe(200);
  });
  test("Success trans status settlement", async () => {
    let order = await Order.findByPk(1);
    let data = {
      transaction_status:"settlement",
      fraud_status:"accept", 
      order_id:order.order_id
    };
    let response = await request(app)
      .post("/midtrans/payment")
      .send(data)
      .set("authorization", userToken);
    expect(response.status).toBe(200);
  });
  test("Success trans status cancel", async () => {
    let order = await Order.findByPk(1);
    let data = {
      transaction_status:"cancel",
      fraud_status:"accept", 
      order_id:order.order_id
    };
    let response = await request(app)
      .post("/midtrans/payment")
      .send(data)
      .set("authorization", userToken);
    expect(response.status).toBe(200);
  });
});
