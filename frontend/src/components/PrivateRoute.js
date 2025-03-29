import React, {useState} from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
};


export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));


  //const user = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
  
  // Check if there's a token and if the user is an admin
  console.log(user)
  if (!token || !user?.is_staff) {
    console.log("user is not staff: ", user)
    return <Navigate to="/" />; // Redirect to login if not an admin
  }

  console.log("Authorized... rendering children")
  return children; // Allow access to the route if user is an admin
};
