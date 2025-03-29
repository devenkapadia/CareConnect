import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Doctor = () => {
  const { speciality } = useParams(); // Get specialization from URL
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(speciality || "");

  const specializations = [...new Set(doctors.map((doc) => doc.speciality))];

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
      setSelectedSpeciality(speciality); // Sync state with URL param
      setFilteredDoctors(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilteredDoctors(doctors);
    }
  }, [speciality, doctors]);

  return (
    <div className="px-6 md:px-10 lg:px-20 text-center">
      {/* Specialization Filter Section */}
      <div className="mb-6">
        <p className="text-lg font-semibold mb-3">Browse by Specialization</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {specializations.map((spec) => (
            <button
              key={spec}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedSpeciality === spec
                  ? "bg-blue-600 text-white"
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              <img
                src={doctor.image}
                alt={doctor.speciality}
                className="w-24 h-24 object-cover transition-transform duration-300 hover:scale-110 rounded-full"
              />
              <div className="text-center mt-3">
                <p className="text-base font-medium text-gray-800 truncate w-50 mx-auto" title={doctor.name}>
                  {doctor.name}
                </p>
                <p className="text-sm text-gray-500">{doctor.speciality}</p>
                <div className="mt-2 px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                  Available
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">No doctors found for selected specialization.</p>
        )}
      </div>
    </div>
  );
};

export default Doctor;
