// Librairie
import React from "react";
import { Navigate } from "react-router-dom";
// Route
import routes from "../Routes/routes";

export default function AuthGuard({ children }) {
  let logged = sessionStorage.getItem("token");

  if (!logged) {
    return <Navigate to={routes.LOGIN} />;
  }

  return children;
}
