import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../navigation/navbar";

//new
export const NavWrapper = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname.includes("admin") ? null : <Navbar />}
      <Outlet />
    </>
  );
};
