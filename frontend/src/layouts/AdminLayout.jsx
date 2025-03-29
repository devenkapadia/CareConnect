import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidePanel from "../components/AdminSidePanel.jsx";

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <AdminNavbar />

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidepanel */}
        <AdminSidePanel />

        {/* Main Content with consistent margin */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
