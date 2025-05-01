import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../../context/DoctorContext";

const Appointments = () => {
  const navigate = useNavigate();
  const {
    fetchAppointments,
    appointments,
    approveAppointment,
    rejectAppointment,
  } = useContext(DoctorContext);

  const [showPast, setShowPast] = useState(false);
  const [appointmentList, setAppointmentList] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await fetchAppointments();
      setLoading(false);
    };
    fetchData();
  }, [fetchAppointments, appointments]);

  useEffect(() => {
    if (appointments) {
      const list = showPast
        ? appointments.completed_appointments || []
        : appointments.pending_appointments || [];
      setAppointmentList(list);
    }
  }, [appointments, showPast]);

  const handleApprove = (id) => {
    approveAppointment(id);
  };

  const handleReject = (id) => {
    rejectAppointment(id);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "requested":
        return "text-yellow-600 font-semibold";
      case "pending":
        return "text-blue-600 font-semibold";
      case "completed":
        return "text-green-600 font-semibold";
      case "cancelled":
        return "text-red-600 font-semibold";
      default:
        return "text-gray-600";
    }
  };
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading appointments...
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <button
          onClick={() => setShowPast((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showPast ? "Show Requested Appointments" : "View Past Appointments"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Patient</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Time</th>
              <th className="py-2 px-4 border-b">Status</th>
              {!showPast && <th className="py-2 px-4 border-b">Actions</th>}
              <th className="py-2 px-4 border-b">Details</th>
            </tr>
          </thead>
          <tbody>
            {appointmentList.map((appointment) => (
              <tr key={appointment.appointmentId} className="text-center">
                <td className="py-2 px-4 border-b">
                  {appointment.patient.first_name}{" "}
                  {appointment.patient.last_name}
                </td>
                <td className="py-2 px-4 border-b">{appointment.date}</td>
                <td className="py-2 px-4 border-b">{appointment.time}</td>
                <td
                  className={`py-2 px-4 border-b ${getStatusStyle(
                    appointment.status
                  )}`}
                >
                  {appointment.status}
                </td>

                {!showPast &&
                  appointment.status.toLowerCase() === "requested" && (
                    <td className="py-2 px-4 border-b space-x-2">
                      <button
                        onClick={() => handleApprove(appointment.appointmentId)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(appointment.appointmentId)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </td>
                  )}

                {!showPast &&
                  appointment.status.toLowerCase() !== "requested" && (
                    <td className="py-2 px-4 border-b text-gray-400">—</td>
                  )}

                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() =>
                      navigate(
                        `/doctor/appointments/${appointment.appointmentId}`,
                        {
                          state: { appointment },
                        }
                      )
                    }
                    className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}

            {appointmentList.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
