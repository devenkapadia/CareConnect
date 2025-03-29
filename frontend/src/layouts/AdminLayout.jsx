import React from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
