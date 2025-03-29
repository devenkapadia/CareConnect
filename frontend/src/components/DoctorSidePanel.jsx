import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiCalendar, FiClock, FiLogOut } from "react-icons/fi";

const DoctorSidePanel = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname.endsWith(path);

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-xl font-bold">Doctor Panel</div>

      <nav className="flex-1">
        <NavLink
          to="/doctor"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/doctor") ? "bg-gray-700" : ""
          }`}
        >
          <FiCalendar className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/doctor/appointments"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/appointments") ? "bg-gray-700" : ""
          }`}
        >
          <FiClock className="mr-3" />
          Appointments
        </NavLink>

        <NavLink
          to="/doctor/unavailability"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/unavailability") ? "bg-gray-700" : ""
          }`}
        >
          <FiClock className="mr-3" />
          Unavailability
        </NavLink>
      </nav>
    </div>
  );
};

export default DoctorSidePanel;
