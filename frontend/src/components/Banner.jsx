import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Banner = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-primary text-white px-6 md:px-12 lg:px-16 py-4 rounded-lg">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col gap-2 items-start">
        <div>
          <p className="text-2xl md:text-3xl font-semibold leading-tight">
            Book Appointment
          </p>
          <p className="text-base md:text-lg font-light">
            With 100+ Trusted Doctors
          </p>
        </div>
        <button className="bg-white text-primary font-medium px-5 py-2 rounded-md shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center mt-3 md:mt-0">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="w-full max-w-[150px] md:max-w-[180px] rounded-md"
        />
      </div>
    </div>
  );
};

export default Banner;
