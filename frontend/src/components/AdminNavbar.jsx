import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 mb-5 border-b border-gray-300 bg-white shadow-sm">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer hover:opacity-80 transition"
        src={assets.logo}
        alt="Logo"
      />

      {/* Navigation */}
      <div className="flex items-center gap-6">
        <button
          onClick={logout}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition hover:bg-blue-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
