import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";
import { FaUserMd } from "react-icons/fa";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-cyan-600 to-teal-500 text-white px-6 md:px-12 lg:px-20 py-10 rounded-3xl shadow-xl overflow-hidden">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col gap-5 items-start">
        <div className="flex items-center gap-3">
          <FaUserMd className="text-white text-4xl" />
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold">CareConnect</h1>
            <p className="text-base md:text-lg font-light text-white/90">
              Your Health. Your Doctor. One Click Away.
            </p>
          </div>
        </div>

        <p className="text-lg md:text-xl font-medium leading-snug">
          Book appointments instantly with 100+ trusted doctors.
        </p>

        <button
          className="bg-white text-teal-600 hover:text-teal-700 font-semibold px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center mt-8 md:mt-0">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full max-w-[220px] rounded-2xl drop-shadow-xl"
        />
      </div>
    </div>
  );
};

export default Banner;
