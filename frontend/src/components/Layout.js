import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarOn = ["/login"];

  return (
    <>
      {!hideNavbarOn.includes(location.pathname) && <Navbar />}
      <div className="container mt-4">{children}</div>
    </>
  );
};

export default Layout;
