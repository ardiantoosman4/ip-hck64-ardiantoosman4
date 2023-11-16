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

describe("GET /my-profile", () => {
  test("Success get my order", async () => {
    const response = await request(app)
      .get("/my-profile")
      .set("authorization", userToken);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("UserId", expect.any(Number));
    expect(response.body[0]).toHaveProperty("order_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("movie_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("price", expect.any(Number));
  });
  test("Get my order failed when user not login", async () => {
    const response = await request(app).get("/my-profile");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
  test("Get order failed when token not valid", async () => {
    const response = await request(app)
      .get("/my-profile")
      .set("authorization", "Bearer asdhjklasdlkj");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
  test("Get order failed when not bearer", async () => {
    const response = await request(app)
      .get("/my-profile")
      .set("authorization", "basic asdhjklasdlkj");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
});

describe("GET /my-profile/order/:OrderId", () => {
  test("Success get my order", async () => {
    const response = await request(app)
      .get("/my-profile/order/1")
      .set("authorization", userToken);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("UserId", expect.any(Number));
    expect(response.body).toHaveProperty("order_id", expect.any(String));
    expect(response.body).toHaveProperty("movie_id", expect.any(String));
    expect(response.body).toHaveProperty("price", expect.any(Number));
  });
  test("Get my order failed when user not login", async () => {
    const response = await request(app).get("/my-profile/order/1");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
  test("Get order failed when token not valid", async () => {
    const response = await request(app)
      .get("/my-profile/order/1")
      .set("authorization", "Bearer asdhjklasdlkj");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
  test("Get order failed when only bearer", async () => {
    const response = await request(app)
      .get("/my-profile/order/1")
      .set("authorization", "Bearer");
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token!");
  });
  test("Get order failed when id not found", async () => {
    const response = await request(app)
      .get("/my-profile/order/999")
      .set("authorization", userToken);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("DELETE /my-profile/order/:OrderId", () => {
  test("Delete article detail failed when user not login", async () => {
    const response = await request(app).delete("/my-profile/order/1");
    expect(response.status).toBe(401);
  });
  test("Delete article detail failed when token not valid", async () => {
    const response = await request(app)
      .delete("/my-profile/order/1")
      .set("authorization", "Bearer asdhjklasdlkj");
    expect(response.status).toBe(401);
  });
  test("Delete article detail failed when id not found", async () => {
    const response = await request(app)
      .delete("/my-profile/order/999")
      .set("authorization", userToken);
    expect(response.status).toBe(404);
  });
});
