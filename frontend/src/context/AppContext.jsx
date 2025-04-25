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
    try {
      const response = await fetch("http://careconnect.local/api/v1/user/doctor", {
        method: "GET",
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
    try {
      const response = await fetch(
        `http://careconnect.local/api/v1/user/doctor/${id}`,
        {
          method: "GET",
          headers: {
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

  const sendFeedback = async (name, email, comments) => {
    const payload = {
      name,
      email,
      comments,
    };

    try {
      const response = await fetch(
        "http://careconnect.local/api/v1/user/public/feedback",
        {
          method: "POST",
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send feedback");
      }

      const data = await response.json();
      console.log("Feedback submitted:", data);
      alert("Thank you for your feedback!");
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Something went wrong while sending feedback.");
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
    fetchDoctors,
    sendFeedback,
    fetchDoctorById,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
