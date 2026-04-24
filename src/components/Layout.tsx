import React from "react";
import { Outlet } from "react-router";
import Chat from "./Chat";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Chat />
    </div>
  );
};

export default Layout;
