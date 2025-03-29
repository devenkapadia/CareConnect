import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiUser, FiPlusCircle, FiDollarSign } from "react-icons/fi";

const AdminSidePanel = () => {
  const location = useLocation();

  // Improved active check for nested routes
  const isActive = (path) => location.pathname.endsWith(path);

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-6 text-xl font-bold">Admin Panel</div>

      <nav className="flex-1">
        <NavLink
          to="/admin"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/admin") && location.pathname === "/admin"
              ? "bg-gray-700"
              : ""
          }`}
        >
          <FiUser className="mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/doctors"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/admin/doctors") ? "bg-gray-700" : ""
          }`}
        >
          <FiUser className="mr-3" />
          Doctors List
        </NavLink>

        <NavLink
          to="/admin/doctors/add"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/admin/doctors/add") ? "bg-gray-700" : ""
          }`}
        >
          <FiPlusCircle className="mr-3" />
          Add Doctor
        </NavLink>

        <NavLink
          to="/admin/transactions"
          className={`flex items-center p-4 hover:bg-gray-700 ${
            isActive("/admin/transactions") ? "bg-gray-700" : ""
          }`}
        >
          <FiDollarSign className="mr-3" />
          Transactions
        </NavLink>
      </nav>
    </div>
  );
};

export default AdminSidePanel;
