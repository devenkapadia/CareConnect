import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
// import { doctors } from "../assets/assets_frontend/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [speciality, setSpciality] = useState([]);
  const currencySymbol = "$";

  // Function to fetch doctors from API
  const fetchDoctors = async () => {
    const token = Cookies.get("token"); // Get Bearer token from cookies
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/v1/user/doctor", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch doctors:", response.status);
        return;
      }

      const data = await response.json();
      const allDoctors = Object.values(data).flat();
      setDoctors(allDoctors);
      const specs = Object.keys(data).flat();
      setSpciality(specs);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchDoctorById = async (id) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return null;
    }

    try {
      const response = await fetch(
        `http://localhost:3002/api/v1/user/doctor/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch doctor with ID ${id}:`, response.status);
        return null;
      }

      const doctor = await response.json();
      return doctor;
    } catch (error) {
      console.error("Error fetching doctor by ID:", error);
      return null;
    }
  };

  // Fetch doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const value = {
    doctors,
    speciality,
    currencySymbol,
    fetchDoctorById
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
