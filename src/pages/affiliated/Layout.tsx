import React from "react";
import Sidebar from "../../components/affiliated/sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "../../assets/affiliated/sass/layout/_layout.scss";

const Layout: React.FC= () => {
  return (
    <div className="layout">
      <div className="main-content">
        <Sidebar/>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
