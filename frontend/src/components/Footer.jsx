import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="text-white py-10 px-6 md:px-12 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        {/* Left Section */}
        <div className="flex flex-col col-span-2 items-center md:items-start">
          <img
            src={assets.logo}
            alt="CareConnect Logo"
            className="w-32 mb-4 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-sm text-gray-400 max-w-xs">
            Booking a doctor’s appointment is quick and easy. Simply choose your
            doctor, preferred time, and location to secure your spot. We make
            healthcare simple and convenient, ensuring you get the care you need
            when you need it.
          </p>
        </div>

        {/* Center Section */}
        <div className="text-black flex flex-col items-center md:items-start">
          <p className="text-lg font-semibold mb-3">Company</p>
          <ul className="text-gray-400 space-y-2">
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/about")}
            >
              About
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="text-black flex flex-col items-center md:items-start">
          <p className="text-lg font-semibold mb-3">Get In Touch</p>
          <ul className="text-gray-400 space-y-2">
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => (window.location.href = "tel:+123112411124")}
            >
              +91 90201 21412
            </li>
            <li
              className="hover:text-black cursor-pointer"
              onClick={() =>
                (window.location.href = "mailto:careconnect@gmail.com")
              }
            >
              careconnect@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
        <p>© 2025 CareConnect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
