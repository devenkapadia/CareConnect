import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctor = () => {
  const { id } = useParams();  // Get doctor ID from URL
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    speciality: ""
  });

  // Simulate fetching the doctor data (replace with API call)
  useEffect(() => {
    const fetchDoctor = async () => {
      // Simulated doctor data (replace with API response)
      const doctorData = {
        id,
        name: "Dr. John Doe",
        speciality: "Cardiologist"
      };
      setDoctor(doctorData);
    };

    fetchDoctor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor updated:", doctor);
    // Simulate updating the doctor in the backend
    navigate("/admin/doctors");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Doctor</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={doctor.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Speciality</label>
          <input
            type="text"
            name="speciality"
            className="w-full p-2 border rounded"
            value={doctor.speciality}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/doctors")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDoctor;
