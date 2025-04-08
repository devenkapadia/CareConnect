import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Logo & Description */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <img
            src={assets.logo}
            alt="CareConnect Logo"
            className="w-36 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="text-gray-400 leading-relaxed max-w-md">
            Booking a doctor’s appointment is now simple and fast. Choose your
            doctor, time, and location with ease. We’re here to make healthcare
            accessible and hassle-free.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400">
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

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 text-gray-400">
            <li
              className="hover:text-black cursor-pointer"
              onClick={() => (window.location.href = "tel:+919020121412")}
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

      {/* Bottom Footer */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-xs">
        © 2025 <span className="font-medium text-white">CareConnect</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
