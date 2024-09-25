import React from "react";
import { Outlet } from "react-router-dom";
import "../../assets/scss/_layout.scss";
import Sidebar from "../../components/sidebar/Sidebar";

const AdminLayout: React.FC = () => {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
