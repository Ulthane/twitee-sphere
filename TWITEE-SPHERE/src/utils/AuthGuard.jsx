// Librairie
import { Navigate } from "react-router-dom";
// Route
import routes from "../routes/route";

export default function AuthGuard({ children }) {
  let logged = sessionStorage.getItem("token");

  if (!logged) {
    return <Navigate to={routes.LOGIN} />;
  }

  return children;
}
