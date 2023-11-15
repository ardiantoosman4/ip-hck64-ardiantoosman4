import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "./views/home";
import Login from "./views/login";
import Register from "./views/register";
import MovieDetail from "./views/movieDetail";
import MyProfile from "./views/myProfile";

function redirectToLogin() {
  if (!localStorage.access_token) {
    return redirect("/");
  }
  return null;
}
function redirectAlreadyLogin() {
  if (localStorage.access_token) {
    return redirect("/");
  }
  return null;
}

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login />, loader: redirectAlreadyLogin },
  { path: "/register", element: <Register />, loader: redirectAlreadyLogin },
  { path: "/movie/:id", element: <MovieDetail /> },
  {
    path: "/my-profile",
    element: <MyProfile />,
    loader: redirectToLogin,
  },
]);
export default router;
