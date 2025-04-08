import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { appointments, fetchAppointments } =
    useContext(DoctorContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointments();
    };

    fetchData();
  }, [fetchAppointments]);

  const pendingCount = appointments?.pending_appointments?.length || 0;
  const completedCount = appointments?.completed_appointments?.length || 0;
  const totalCount = pendingCount + completedCount;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome, Doctor
      </h1>
      <p className="text-gray-600 mb-6">Here’s an overview of your day.</p>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 text-blue-800 rounded-lg p-6 text-center shadow hover:shadow-md transition">
          <p className="text-sm uppercase font-medium">Total Appointments</p>
          <p className="text-3xl font-bold mt-2">{totalCount}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 rounded-lg p-6 text-center shadow hover:shadow-md transition">
          <p className="text-sm uppercase font-medium">Pending</p>
          <p className="text-3xl font-bold mt-2">{pendingCount}</p>
        </div>
        <div className="bg-green-100 text-green-800 rounded-lg p-6 text-center shadow hover:shadow-md transition">
          <p className="text-sm uppercase font-medium">Completed</p>
          <p className="text-3xl font-bold mt-2">{completedCount}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/doctor/appointments")}
          className="bg-blue-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
        >
          View Appointments
        </button>
        <button
          onClick={() => navigate("/doctor/unavailability")}
          className="bg-purple-600 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-purple-700 transition"
        >
          Manage Unavailability
        </button>
        <button
          onClick={() => navigate("/doctor/profile")}
          className="bg-gray-700 text-white px-6 py-4 rounded-lg text-lg font-medium hover:bg-gray-800 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default DoctorDashboard;
