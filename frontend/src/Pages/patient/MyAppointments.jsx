import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { appointments, fetchAppointments, loading } = useContext(UserContext);
  const [showCompleted, setShowCompleted] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const pendingAppointments = appointments.pending_appointments || [];
  const completedAppointments = appointments.completed_appointments || [];

  const visibleAppointments = showCompleted
    ? completedAppointments
    : pendingAppointments;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">My Appointments</h1>

      <div className="mb-4">
        <button
          className="text-blue-600 underline"
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted
            ? "Show Pending Appointments"
            : "Show Completed Appointments"}
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading appointments...</p>
      ) : visibleAppointments.length === 0 ? (
        <p className="text-gray-500 text-lg">
          {showCompleted
            ? "No completed appointments."
            : "No pending appointments."}
        </p>
      ) : (
        <div className="space-y-4">
          {visibleAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition hover:scale-[1.02] justify-between"
            >
              {/* Doctor Image */}
              <img
                src={
                  appointment.doctor?.image || "https://via.placeholder.com/150"
                }
                alt={appointment.doctor?.name || "Doctor"}
                className="w-16 h-16 object-cover rounded-full"
              />

              {/* Doctor & Appointment Info */}
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold">
                  {appointment.doctor?.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {appointment.doctor?.specialization}
                </p>
                <p className="text-xs text-gray-500">
                  {appointment.doctor?.degree || "Degree not provided"},{" "}
                  {appointment.doctor?.years_of_experience || "N/A"} yrs
                </p>
                <p className="text-sm">
                  <strong>Date & Time:</strong>{" "}
                  {appointment.date || "Date not set"} |{" "}
                  {appointment.time || "Time not set"}
                </p>
                <p className="text-sm mt-1">
                  <strong>Patient:</strong> {appointment.patient?.first_name}{" "}
                  {appointment.patient?.last_name}
                </p>
              </div>

              <span
                className={`font-semibold ${
                  appointment.status === "completed"
                    ? "text-green-600"
                    : "text-yellow-600"
                }`}
              >
                {appointment.status.charAt(0).toUpperCase() +
                  appointment.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
