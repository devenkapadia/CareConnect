import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";

const MyProfile = () => {
  const token = Cookies.get("token");

  const [userData, setUserData] = useState({ name: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPatient, setNewPatient] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "FEMALE",
  });

  const { fetchPatients, addPatient, patients } = useContext(UserContext);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserData({
        name: decoded.name || "N/A",
        email: decoded.email || "N/A",
      });
    }

    fetchPatients(); // fetch patients from backend
  }, [token]);

  const handlePatientChange = (e) => {
    setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  };

  const handleAddPatient = async () => {
    await addPatient(newPatient);
    await fetchPatients(); // fetch updated list
    setNewPatient({
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "FEMALE",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen p-10">
      {/* User Info Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">My Profile</h1>
        <p className="text-lg">
          <strong>Name:</strong> {userData.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {userData.email}
        </p>
      </div>

      {/* Add Patient Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Add Patient
        </button>
      </div>

      {/* Patients Table */}
      {patients.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border">First Name</th>
                <th className="py-2 px-4 border">Last Name</th>
                <th className="py-2 px-4 border">DOB</th>
                <th className="py-2 px-4 border">Gender</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 border">{patient.first_name}</td>
                  <td className="py-2 px-4 border">{patient.last_name}</td>
                  <td className="py-2 px-4 border">{patient.date_of_birth}</td>
                  <td className="py-2 px-4 border">{patient.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg">
            <h2 className="text-xl font-semibold">Add Patient</h2>

            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={newPatient.first_name}
              onChange={handlePatientChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={newPatient.last_name}
              onChange={handlePatientChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="date"
              name="date_of_birth"
              value={newPatient.date_of_birth}
              onChange={handlePatientChange}
              className="w-full p-2 border rounded"
            />
            <select
              name="gender"
              value={newPatient.gender}
              onChange={handlePatientChange}
              className="w-full p-2 border rounded"
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="OTHER">Other</option>
            </select>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
