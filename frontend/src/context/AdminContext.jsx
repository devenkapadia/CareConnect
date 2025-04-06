import React, { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  const API_BASE = "http://localhost:3004/api/v1/admin";

  const getToken = () => Cookies.get("token");

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/stats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch stats");

      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      setError(error.message);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_BASE}/appointment`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch appointments");

      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError(error.message);
    }
  };

  const fetchAllDoctors = async () => {
    try {
      const response = await fetch(`${API_BASE}/doctor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch doctors");

      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError(error.message);
    }
  };

  const fetchDoctorById = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/doctor/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch doctor ${id}`);

      return await response.json();
    } catch (error) {
      console.error(`Error fetching doctor ${id}:`, error);
      setError(error.message);
    }
  };

  const addDoctor = async (doctorData) => {
    try {
      const response = await fetch(`${API_BASE}/doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(doctorData),
      });

      if (!response.ok) throw new Error("Failed to add doctor");

      const data = await response.json();
      fetchAllDoctors(); // Refresh doctor list after adding
      return data;
    } catch (error) {
      console.error("Error adding doctor:", error);
      setError(error.message);
    }
  };

  const updateDoctor = async (id, updatedData) => {
    try {
      const response = await fetch(`${API_BASE}/doctor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error(`Failed to update doctor ${id}`);

      const data = await response.json();
      fetchAllDoctors(); // Refresh doctor list after updating
      return data;
    } catch (error) {
      console.error(`Error updating doctor ${id}:`, error);
      setError(error.message);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const response = await fetch(`${API_BASE}/doctor/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to delete doctor ${id}`);

      fetchAllDoctors(); // Refresh doctor list after deleting
    } catch (error) {
      console.error(`Error deleting doctor ${id}:`, error);
      setError(error.message);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        stats,
        appointments,
        doctors,
        error,
        fetchStats,
        fetchAppointments,
        fetchAllDoctors,
        fetchDoctorById,
        addDoctor,
        updateDoctor,
        deleteDoctor,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
