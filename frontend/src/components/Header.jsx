import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-20">
      {/* Left Side (Text + Button) */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 text-white text-left">
        <p className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug">
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-light">
          <img
            className="w-28"
            src={assets.group_profiles}
            alt="Group Profiles"
          />
          <p className="max-w-sm">
            Simply browse through our extensive list of trusted doctors and
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#"
          className="flex items-center gap-2 bg-white text-primary font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition"
          onClick={()=>navigate("/doctors")}
        >
          Book Appointment{" "}
          <img className="w-5" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* Right Side (Image) */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <img
          className="w-full max-w-md md:max-w-lg h-auto rounded-lg"
          src={assets.header_img}
          alt="Doctor Illustration"
        />
      </div>
    </div>
  );
};

export default Header;
