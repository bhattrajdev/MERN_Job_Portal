import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import api from "../config/api";

function RouteMiddleware({ children }) {
  let token = localStorage.getItem("token") ?? false;

  useEffect(() => {
    // Check the validity of the token
    if (token) {
      api
        .get("/auth/valid-token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.isLogin === false) {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [token]);

  return token ? children : <Navigate to="/login" />;
}

export default RouteMiddleware;
