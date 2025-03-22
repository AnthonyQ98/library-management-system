import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear auth token
    navigate("/login"); // Redirect to login page
  };

  if (!isAuthenticated) return null; // Hide Navbar if not logged in

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">📚 Library</Link>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
