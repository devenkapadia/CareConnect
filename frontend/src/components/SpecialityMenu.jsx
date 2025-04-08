import React from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

const SpecialityMenu = () => {

  return (
    <div
      id="speciality"
      className="px-6 md:px-10 lg:px-20 py-12 bg-gradient-to-br from-white to-cyan-50"
    >
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          Explore Specialties
        </h1>
        <p className="text-gray-600 text-base md:text-lg mt-2">
          Browse and book appointments with our trusted specialists.
        </p>
      </div>

      {/* Speciality Grid - 6 in one line */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="w-28 sm:w-32 md:w-36 flex flex-col items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full border-4 border-cyan-200 shadow-sm mb-3"
            />
            <p className="text-center text-sm font-medium text-gray-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
