import React from "react";
import { Outlet } from "react-router-dom";
import DoctorNavbar from "../components/AdminNavbar";
import DoctorSidePanel from "../components/DoctorSidePanel.jsx";

const DoctorLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <DoctorNavbar />

      {/* Content Section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidepanel */}
        <DoctorSidePanel />

        {/* Main Content with consistent margin */}
        <div className="flex-1 overflow-auto p-8 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;
