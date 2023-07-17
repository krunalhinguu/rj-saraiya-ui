import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function AdminRoute({ children, ...rest }) {
  const location = useLocation();
  const user = useSelector((state) => state.user?.data);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  return isAdmin ? (
    children
  ) : (
    <Navigate
      to={"/unauthorised"}
      replace
      state={{ path: location.pathname }}
    />
  );
}

export default AdminRoute;
