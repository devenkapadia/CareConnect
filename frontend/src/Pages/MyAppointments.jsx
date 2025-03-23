import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Appointments</h1>

      {doctors.length === 0 ? (
        <p className="text-gray-500 text-lg">No appointments booked yet.</p>
      ) : (
        <div className="space-y-4">
          {doctors.slice(0, 3).map((doctor) => (
            <div
              key={doctor._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition hover:scale-[1.02] justify-between"
            >
              {/* Doctor Image */}
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 object-cover rounded-full"
              />

              {/* Doctor & Appointment Info */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">{doctor.name}</h2>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                <p className="text-xs text-gray-500">{doctor.degree}, {doctor.experience}</p>
                <p className="text-sm">
                  <strong>Date & Time:</strong> 25 July, 2024 | 8:30 PM
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Pay Now
                </button>
                <button className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100">
                  Cancel appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;

/*
          {appointments.map((appointment) => {
            const doctor = doctors.find((doc) => doc._id === appointment.doctorId);
            if (!doctor) return null;

            return (
              <div
                key={appointment._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-transform hover:scale-105"
              >
                
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-40 object-cover rounded-md"
                />

                <div className="mt-4">
                  <h2 className="text-xl font-semibold">{doctor.name}</h2>
                  <p className="text-gray-600">{doctor.speciality}</p>
                  <p className="text-sm text-gray-500">{doctor.degree}, {doctor.experience}</p>
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Address:</strong> {doctor.address.line1}, {doctor.address.line2}
                  </p>
                  <p className="mt-2 text-sm">
                    <strong>Appointment:</strong> {appointment.date} at {appointment.time}
                  </p>
                  <p className="text-green-600 font-semibold mt-2">Fees: ${doctor.fees}</p>

                  <button
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    onClick={() => navigate(`/appointment/${doctor._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
*/