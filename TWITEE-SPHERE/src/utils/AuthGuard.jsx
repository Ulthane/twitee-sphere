// Librairie
import React from "react";
import { Navigate } from "react-router-dom";
// Route
import routes from "../routes/route";

export default function AuthGuard({ children }) {
  let logged = sessionStorage.getItem("token");
  // console.log(logged);

  if (!logged) {
    return <Navigate to={routes.LOGIN} />;
  }

  return children;
}
