import React from "react";
import DoctorNavbar from "../components/DoctorNavbar";
import { Outlet } from "react-router-dom";

const DoctorLayout = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <DoctorNavbar />
      <Outlet />
    </div>
  );
};

export default DoctorLayout;
