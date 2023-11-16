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
  await Order.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, restartIdentity: true, cascade: true });
});

describe("post /midtrans/token", () => {
  let data = {
    price: 100,
    title: "asd",
    movie_id: 1,
    imgUrl: "jkjlk",
    description: "qweqwe",
    duration: 0,
  };

  test("Success place order", async () => {
    let response = await request(app)
      .post("/midtrans/token")
      .send(data)
      .set("authorization", userToken);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token", expect.any(String));
  });
  test("Place order failed when user not login", async () => {
    let response = await request(app).post("/midtrans/token").send(data);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
  test("Place order failed when token not valid", async () => {
    let response = await request(app)
      .post("/midtrans/token")
      .send(data)
      .set("authorization", "Bearer asdhjklasdlkj");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });

  test("Place order failed when movie_id not provided", async () => {
    let data = {
      price: 100,
      title: "asd",
      imgUrl: "jkjlk",
      description: "qweqwe",
      duration: 0,
    };
    let response = await request(app)
      .post("/midtrans/token")
      .send(data)
      .set("authorization", userToken);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
