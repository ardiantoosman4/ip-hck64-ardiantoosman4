import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./login";
import Home from "./home";
function redirectToLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
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
  {
    path: "/",
    element: <Home />,
    loader: redirectToLogin,
  },
  { path: "/login", element: <Login />, loader: redirectAlreadyLogin },
]);
export default router;
