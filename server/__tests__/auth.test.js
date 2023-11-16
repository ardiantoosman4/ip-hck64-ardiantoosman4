const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
beforeAll(async () => {
  let data = {
    username: "admin",
    email: "admin@mail.com",
    password: "admin",
    role: "admin",
    phoneNumber: 12345,
    address: "jalan admin",
  };
  await User.create(data);
});
afterAll(async () => {
  await User.destroy({ truncate: true, restartIdentity: true, cascade: true });
});

describe("POST /login", () => {
  test("Email is required", async () => {
    let data = { email: "", password: "admin" };
    const response = await request(app).post("/login").send(data);
    expect(response.status).toBe(400);
  });
  test("Password is required", async () => {
    let data = { email: "admin@mail.com", password: "" };
    const response = await request(app).post("/login").send(data);
    expect(response.status).toBe(400);
  });
  test("Email is not valid", async () => {
    let data = { email: "asdasd@mail.com", password: "admin" };
    const response = await request(app).post("/login").send(data);
    expect(response.status).toBe(401);
  });
  test("Password is not valid", async () => {
    let data = { email: "admin@mail.com", password: "asdasd" };
    const response = await request(app).post("/login").send(data);
    expect(response.status).toBe(401);
  });
  test("Login success", async () => {
    let data = { email: "admin@mail.com", password: "admin" };
    const response = await request(app).post("/login").send(data);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });
});

describe("POST /register", () => {
  test("Register success", async () => {
    let data = { email: "staff1@mail.com", password: "staff1" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", expect.any(Number));
    expect(response.body).toHaveProperty("email", expect.any(String));
  });
  test("Email is required", async () => {
    let data = { password: "staff1" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required!");
  });
  test("Password is required", async () => {
    let data = { email: "staff1@mail.com" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required!");
  });
  test("Email is empty string", async () => {
    let data = { email: "", password: "staff1" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email format is not valid!"
    );
  });
  test("Password is empty string", async () => {
    let data = { email: "staff1@mail.com", password: "" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Password length must be 5 or greater!"
    );
  });
  test("Email already exist", async () => {
    let data = { email: "admin@mail.com", password: "admin" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "email must be unique");
  });
  test("Email is not valid", async () => {
    let data = { email: "asdasdmail.com", password: "staff1" };
    const response = await request(app).post("/register").send(data);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Email format is not valid!"
    );
  });
});
