import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Redirect, Route, useLocation } from "react-router-dom";

function PrivateRoute({ children, ...rest }) {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={"/login"} replace state={{ path: location.pathname }} />
  );
}

export default PrivateRoute;
