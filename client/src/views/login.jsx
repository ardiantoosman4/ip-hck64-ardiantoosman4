import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "./login-register.css";
import bgImg from "/login-register-bg.jpg";
import logo from "/logo.png";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { URL_DATA } from "../CONSTANT";
import swal from "sweetalert";

export default function Login() {
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
  async function handleLogin(event) {
    try {
      event.preventDefault();
      console.log(form);
      const { data } = await axios({
        method: "POST",
        url: URL_DATA + "/login",
        data: {
          email: form.email,
          password: form.password,
        },
      });
      localStorage.access_token = data.access_token;
      navigate("/");
    } catch (error) {
      swal("Login Failed", error.response.data.message, "error");
    }
  }
  async function handleCredentialResponse(params) {
    try {
      const { data } = await axios({
        method: "POST",
        url: URL_DATA + "/googleLogin",
        data: { googleToken: params.credential },
      });
      localStorage.access_token = data.access_token;
      navigate("/");
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
          <h2>Sign In</h2>
          <form className="mt-4" onSubmit={handleLogin}>
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
            <button type="submit">Sign In</button>
            <div className="my-2 d-flex flex-column justify-content-center align-items-center">
              <GoogleLogin
                className="my-2"
                onSuccess={(credentialResponse) => {
                  handleCredentialResponse(credentialResponse);
                }}
                onError={() => {
                  swal("Login Failed", "Please Check Inputed Data", "error");
                }}
              />
              <p className="my-4">
                New to <b className="text-danger">TENFLIX</b>?
                <Link to="/register">Register Here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
