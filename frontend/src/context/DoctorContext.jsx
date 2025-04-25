import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);

  const token = Cookies.get("token");

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://careconnect.local/api/v1/doctor/appointment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments", err);
    }
  };

  const fetchDoctorDetails = async () => {
    try {
      const res = await fetch("http://careconnect.local/api/v1/doctor", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log(data);
      
      setDoctorDetails(data);
    } catch (err) {
      console.error("Error fetching doctor details", err);
    }
  };

  const approveAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        `http://careconnect.local/api/v1/doctor/appointment/${appointmentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error("Error approving appointment", err);
    }
  };

  const rejectAppointment = async (appointmentId) => {
    try {
      const res = await fetch(
        `http://careconnect.local/api/v1/doctor/appointment/reject/${appointmentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        fetchAppointments();
      }
    } catch (err) {
      console.error("Error rejecting appointment", err);
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        appointments,
        doctorDetails,
        fetchAppointments,
        fetchDoctorDetails,
        approveAppointment,
        rejectAppointment,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
