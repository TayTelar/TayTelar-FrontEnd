import React from "react";
import { Outlet } from "react-router-dom";
import "../../../assets/admin/scss/_layout.scss";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

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
