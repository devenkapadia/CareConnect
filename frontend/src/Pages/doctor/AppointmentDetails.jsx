import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const appointment = {
    id: id,
    patient: "John Doe",
    date: "2025-04-01",
    time: "10:00 AM",
    reason: "Routine Checkup",
    status: "Confirmed",
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Appointment Details</h1>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <p className="text-lg font-medium">Patient: {appointment.patient}</p>
        <p className="text-gray-600">Date: {appointment.date}</p>
        <p className="text-gray-600">Time: {appointment.time}</p>
        <p className="text-gray-600">Reason: {appointment.reason}</p>
        <p className="text-gray-600">Status: {appointment.status}</p>

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
