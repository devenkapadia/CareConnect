import { React, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  
  return (
    <div className="px-6 md:px-10 lg:px-20 py-10">
      {/* Heading Section */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-2">
        Top Doctors to Book
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors Grid - 5 per row on large screens */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {doctors.slice(0, 10).map((doctor) => (
          <div
            key={doctor._id}
            className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigate(`/appointment/${doctor.doctor_id}`)}
          >
            {/* Doctor Image */}
            <img
              src={doctor.image}
              alt={doctor.speciality}
              className="w-30 h-30 object-cover transition-transform duration-300 hover:scale-110"
            />

            {/* Doctor Info */}
            <div className="text-center mt-4 w-full">
              <p
                className="text-base font-medium text-gray-800 truncate w-50 mx-auto"
                title={doctor.name} // Full name on hover
              >
                {doctor.name}
              </p>
              <p className="text-sm text-gray-500">{doctor.speciality}</p>
              <div className="mt-2 px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                Available
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="px-6 py-2 text-white font-semibold bg-primary rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
