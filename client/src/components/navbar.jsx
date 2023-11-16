import logo from "/logo.png";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Navbar() {
  const navigate = useNavigate();

  function handleClickLogo() {
    navigate("/");
  }
  function handleClickLogout() {
    localStorage.clear();
    swal("Logout Success!", "", "success");
    navigate("/");
  }
  function handleClickLogin() {
    navigate("/login");
  }
  function handleClickProfile() {
    navigate("/my-profile");
  }
  return (
    <>
      <div
        id="navbar"
        className="container d-flex justify-content-between align-items-center"
        style={{ height: "50px" }}
      >
        <div id="logo">
          <img
            onClick={handleClickLogo}
            src={logo}
            alt="tenflix"
            style={{ height: "30px", cursor: "pointer" }}
          />
        </div>
        <div className="d-flex gap-3">
          {localStorage.access_token ? (
            <>
              <div>
                <a onClick={handleClickProfile} style={{ cursor: "pointer" }}>
                  My-Profile
                </a>
              </div>
              <div>
                <a onClick={handleClickLogout} style={{ cursor: "pointer" }}>
                  Logout
                </a>
              </div>
            </>
          ) : (
            <div>
              <a onClick={handleClickLogin} style={{ cursor: "pointer" }}>
                Login
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
