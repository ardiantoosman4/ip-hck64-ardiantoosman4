import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./login-register.css";
import bgImg from "/login-register-bg.jpg";
import logo from "/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { URL_DATA } from "../CONSTANT";
import swal from "sweetalert";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  function handleInput(event) {
    setForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }
  async function handleSubmit(event) {
    try {
      event.preventDefault();
      console.log(form);
      const { data } = await axios({
        method: "POST",
        url: URL_DATA + "/register",
        data: {
          email: form.email,
          password: form.password,
        },
      });
      navigate("/login");
      swal("Register Success!", "Success create new TENFLIX account, Login Now", "success");
    } catch (error) {
      swal("Login Failed", error.response.data.message, "error");
    }
  }
  return (
    <>
      <div
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${bgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <nav>
          <a href="#">
            <img src={logo} alt="tenflix" />
          </a>
        </nav>
        <div className="form-wrapper">
          <h2>Sign Up</h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                onChange={handleInput}
                name="email"
                type="email"
                autoComplete="off"
                required=""
              />
              <label>Email</label>
            </div>
            <div className="input-box">
              <input
                onChange={handleInput}
                name="password"
                type="password"
                autoComplete="off"
                required=""
              />
              <label>Password</label>
            </div>
            <button type="submit">Register Now</button>
            <div className="my-2 d-flex flex-column justify-content-center align-items-center">
              <p className="my-4">
                Already on <b className="text-danger">TENFLIX</b>?
                <Link to="/login"> Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
