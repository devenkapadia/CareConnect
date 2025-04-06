import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, fetchAllDoctors, deleteDoctor } = useContext(AdminContext);

  useEffect(() => {
    fetchAllDoctors();
  }, []);

  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const specializations = ["All", ...Object.keys(doctors)];

  const filteredDoctors =
    selectedSpecialization === "All"
      ? Object.values(doctors).flat()
      : doctors[selectedSpecialization] || [];

  // Function to confirm delete action
  const handleDeleteClick = (doctor) => {
    setDoctorToDelete(doctor);
    setShowModal(true);
  };

  // Function to handle doctor deletion
  const confirmDelete = async () => {
    if (doctorToDelete) {
      await deleteDoctor(doctorToDelete.doctor_id);
      fetchAllDoctors();
      setShowModal(false);
      setDoctorToDelete(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Doctors List</h1>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="specialization" className="mr-2">
          Filter by Specialization:
        </label>
        <select
          id="specialization"
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          className="border p-2 rounded"
        >
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={doctor.image}
                alt={doctor.specialization}
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="text-center mt-3">
                <p className="text-base font-medium text-gray-800 truncate w-50 mx-auto" title={doctor.name}>
                  {doctor.name}
                </p>
                <p className="text-sm text-gray-500">{doctor.specialization}</p>
                <div className="mt-4 flex justify-between w-full">
                  <Link
                    to={`/admin/doctors/${doctor.doctor_id}/edit`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(doctor)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
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

      {/* Delete Confirmation Modal */}
      {showModal && doctorToDelete && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700">
              Are you sure you want to delete{" "}
              <strong>{doctorToDelete.name}</strong> -{" "}
              <em>{doctorToDelete.specialization}</em>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
