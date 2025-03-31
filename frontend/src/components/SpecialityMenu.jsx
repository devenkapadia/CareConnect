import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";

const SpecialityMenu = () => {
  const { speciality } = useContext(AppContext);
  console.log(speciality);
  
  return (
    <div id="speciality" className="px-6 md:px-10 lg:px-20 py-10">
      {/* Heading Section */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">
        Find by Speciality
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>

      {/* Speciality Grid */}
      <div className="flex flex-wrap justify-center gap-6 overflow-x-auto scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="w-40 md:w-48 lg:w-56 flex flex-col items-center gap-2 p-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl"
          >
            <img
              className="w-20 h-20 object-cover rounded-full transition-transform duration-300 hover:scale-110"
              src={item.image}
              alt={item.speciality}
            />
            <p className="text-sm font-medium text-gray-700 text-center">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
