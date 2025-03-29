import React from "react";
import { useNavigate } from "react-router-dom";

const Appointments = () => {
  const navigate = useNavigate();
  const appointments = [
    { id: "1", patient: "John Doe", date: "2025-04-01", time: "10:00 AM" },
    { id: "2", patient: "Jane Smith", date: "2025-04-02", time: "11:30 AM" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>

      <div className="grid grid-cols-1 gap-6">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate(`/doctor/appointments/${appointment.id}`)}
          >
            <p className="text-lg font-medium">{appointment.patient}</p>
            <p className="text-gray-600">
              {appointment.date} - {appointment.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
