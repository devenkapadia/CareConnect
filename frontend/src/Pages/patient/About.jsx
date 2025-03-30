import React from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            About <span className="text-blue-600">Our Platform</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Your health is our priority. We connect patients with top-rated doctors 
            for seamless and hassle-free appointments.
          </p>
          <button
            onClick={() => navigate("/doctors")}
            className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            Book an Appointment
          </button>
        </div>
        <div className="flex-1">
          <img
            src={assets.about_image}
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Our Mission */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We aim to simplify healthcare by making doctor appointments accessible, 
          reliable, and fast. Our goal is to bridge the gap between doctors and patients 
          using technology.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-600">Instant Booking</h3>
          <p className="mt-2 text-gray-600">
            Book appointments with top doctors in just a few clicks.
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-600">Verified Doctors</h3>
          <p className="mt-2 text-gray-600">
            Connect with highly qualified and experienced professionals.
          </p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-blue-600">Secure & Private</h3>
          <p className="mt-2 text-gray-600">
            Your personal and medical data remains safe with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
