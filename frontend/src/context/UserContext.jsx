import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  // Fetch all appointments
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://careconnect.local/api/v1/user/appointment", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create a new appointment
  const createAppointment = async (appointmentData) => {
    try {
      const response = await fetch("http://careconnect.local/api/v1/user/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) throw new Error("Failed to create appointment");

      const newAppointment = await response.json();
      setAppointments((prev) => [...prev, newAppointment]);
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  // Fetch all patients
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://careconnect.local/api/v1/user/patient", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch patients");
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new patient
  const addPatient = async (patientData) => {
    try {
      const response = await fetch("http://careconnect.local/api/v1/user/patient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(patientData),
      });

      if (!response.ok) throw new Error("Failed to add patient");

      const newPatient = await response.json();
      setPatients((prev) => [...prev, newPatient]);
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        appointments,
        patients,
        loading,
        fetchAppointments,
        createAppointment,
        fetchPatients,
        addPatient,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
