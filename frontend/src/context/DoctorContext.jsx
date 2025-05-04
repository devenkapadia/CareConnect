import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const src = "http://careconnect.local/api/v1"

  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [unavailabileSlots, setunavailabileSlots] = useState([]);

  const token = Cookies.get("token");

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${src}/doctor/appointment`, {
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
      const res = await fetch(`${src}/doctor`, {
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
      const res = await fetch(`${src}/doctor/appointment/${appointmentId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
        `${src}/doctor/appointment/reject/${appointmentId}`,
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

  // Fetch unavailable slots
  const getUnavailableSlots = async () => {
    try {
      if (!token) throw new Error("JWT token not found in cookies");
  
      const response = await fetch(`${src}/doctor/slots/unavailable`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch unavailable slots");
      }
  
      const data = await response.json();
      setunavailabileSlots(data); // Save to context state
      console.log("slots", data);
      
      return data; // Still return in case component also uses it
    } catch (error) {
      console.error("Error fetching unavailable slots:", error);
      throw error;
    }
  };

  // Mark slot as unavailable
  const markSlotUnavailable = async (slots) => {
    try {
      if (!token) throw new Error("JWT token not found in cookies");
  
      const requestBody = { slots };
  
      const response = await fetch(`${src}/doctor/slots/unavailable`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to mark slot as unavailable");
      }
  
      const message = await response.text(); // assuming server sends a message
      console.log("Slots marked as unavailable successfully");
  
      // Refresh latest unavailable slots into context state
      const latest = await getUnavailableSlots();
      setunavailabileSlots(latest);
  
      return { message };
    } catch (error) {
      console.error("Error marking slot as unavailable:", error);
      throw error;
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        appointments,
        doctorDetails,
        unavailabileSlots,
        setunavailabileSlots,
        fetchAppointments,
        fetchDoctorDetails,
        approveAppointment,
        rejectAppointment,
        getUnavailableSlots,
        markSlotUnavailable,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};
