import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AppointmentDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const appointment = state?.appointment;

  if (!appointment) {
    return (
      <div className="p-6">
        <p>Loading appointment details...</p>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg font-medium">
          Patient: {appointment.patient.first_name} {appointment.patient.last_name}
        </p>
        <p className="text-gray-600">Date: {appointment.date}</p>
        <p className="text-gray-600">Time: {appointment.time}</p>
        <p className="text-gray-600">Status: {appointment.status}</p>
        <p className="text-gray-600">Doctor: {appointment.doctor.name}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
