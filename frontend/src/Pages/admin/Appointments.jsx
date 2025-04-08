import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FiCalendar } from "react-icons/fi";

const Appointments = () => {
  const { fetchAppointments, appointments } = useContext(AdminContext);
  const [appointmentList, setAppointmentList] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointments) {
      const mergedAppointments = [
        ...(appointments.pending_appointments || []),
        ...(appointments.completed_appointments || []),
      ];
      setAppointmentList(mergedAppointments);
    }
  }, [appointments]);

  const getStatusLabel = (status) => {
    switch (status) {
      case "REQUESTED":
        return <span className="text-yellow-500">Requested</span>;
      case "PENDING":
        return <span className="text-blue-500">Pending</span>;
      case "COMPLETED":
        return <span className="text-green-500">Completed</span>;
      case "CANCELLED":
        return <span className="text-red-500">Cancelled</span>;
      default:
        return <span className="text-gray-500">Unknown</span>;
    }
  };

  const getDoctorApprovalStatus = (status) => {
    if (status === "REQUESTED") return <span className="text-yellow-500">Waiting for Approval</span>;
    if (status === "CANCELLED") return <span className="text-red-500">Rejected</span>;
    return <span className="text-green-500">Approved</span>; // For PENDING or COMPLETED
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FiCalendar className="mr-3" />
        Appointments
      </h1>

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Doctor</th>
            <th className="px-4 py-2 border-b text-left">Patient</th>
            <th className="px-4 py-2 border-b text-left">Date</th>
            <th className="px-4 py-2 border-b text-left">Time</th>
            <th className="px-4 py-2 border-b text-left">Status</th>
            <th className="px-4 py-2 border-b text-left">Doctor Approval</th>
          </tr>
        </thead>
        <tbody>
          {appointmentList.length > 0 ? (
            appointmentList.map((appointment) => (
              <tr key={appointment.appointmentId} className="border-b">
                <td className="px-4 py-2">{appointment.doctor.name}</td>
                <td className="px-4 py-2">
                  {appointment.patient.first_name} {appointment.patient.last_name}
                </td>
                <td className="px-4 py-2">{appointment.date}</td>
                <td className="px-4 py-2">{appointment.time}</td>
                <td className="px-4 py-2">{getStatusLabel(appointment.status)}</td>
                <td className="px-4 py-2">{getDoctorApprovalStatus(appointment.status)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-600">
                No appointments found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
