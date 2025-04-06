import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(speciality || "");

  const specializations = [...new Set(doctors.map((doc) => doc.specialization))];

  // Handle filter selection
  const handleFilterClick = (selected) => {
    if (selectedSpeciality === selected) {
      setSelectedSpeciality(""); // Deselect if already selected
      navigate("/doctors"); // Reset to show all doctors
    } else {
      setSelectedSpeciality(selected);
      navigate(`/doctors/${selected}`); // Navigate to selected specialization
    }
  };

  // Apply filtering based on selected specialization
  useEffect(() => {
    if (speciality) {
      setSelectedSpeciality(speciality);
      setFilteredDoctors(
        doctors.filter((doc) => doc.specialization === speciality)
      );
    } else {
      setFilteredDoctors(doctors);
    }
  }, [speciality, doctors]);

  return (
    <div className="px-6 md:px-10 lg:px-20 text-center">
      {/* Specialization Filter Section */}
      <div className="mb-10">
        <p className="text-2xl font-bold text-gray-800 mb-6">Browse by Specialization</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {specializations.map((spec) => (
            <button
              key={spec}
              className={`px-5 py-2 rounded-lg text-md font-medium transition-all duration-300 
              ${
                selectedSpeciality === spec
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => handleFilterClick(spec)}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.slice(0, 10).map((doctor) => (
            <div
              key={doctor._id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-5 
              transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl 
              cursor-pointer"
              onClick={() => navigate(`/appointment/${doctor.doctor_id}`)}
            >
              {/* Doctor Image */}
              <div className="overflow-hidden shadow-lg border-4 border-gray-200">
                <img
                  src={doctor.image}
                  alt={doctor.speciality}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Doctor Info */}
              <div className="text-center mt-4 w-full">
                <p
                  className="text-lg font-medium text-gray-800 truncate w-full"
                  title={doctor.name}
                >
                  {doctor.name}
                </p>
                <p className="text-sm text-gray-500">{doctor.speciality}</p>
                <div className="mt-2 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                  Available
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No doctors found for selected specialization.
          </p>
        )}
      </div>
    </div>
  );
};

export default Doctor;
