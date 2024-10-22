import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
