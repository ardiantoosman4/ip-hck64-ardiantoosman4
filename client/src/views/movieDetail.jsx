import "./login-register.css";
import bgImg from "/login-register-bg.jpg";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  function handleClick() {
    try {
      navigate("/");
    } catch (error) {
      console.log(error);
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
          <h2>This page is under construction</h2>

          <button id="btnConstruction" onClick={handleClick} type="button">
            Back To Home
          </button>
        </div>
      </div>
    </>
  );
}
