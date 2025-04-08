import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-2xl px-6 md:px-14 lg:px-24 py-12 shadow-lg">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find & Book Trusted Doctors
        </h1>

        <p className="text-base md:text-lg text-white/90 max-w-md">
          Explore a wide network of verified professionals and book appointments at your convenience with just a few clicks.
        </p>

        <div className="flex items-center gap-4 mt-2">
          <img className="w-24 md:w-28" src={assets.group_profiles} alt="Profiles" />
        </div>

        <button
          onClick={() => navigate("/doctors")}
          className="mt-4 w-max bg-white text-teal-600 hover:text-teal-700 px-6 py-3 rounded-xl font-semibold shadow-md transition"
        >
          Book Appointment
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center md:justify-end">
        <img
          className="w-full max-w-md md:max-w-lg h-auto rounded-xl"
          src={assets.header_img}
          alt="Doctor Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
