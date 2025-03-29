import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor added:", { name, speciality });
    navigate("/admin/doctors");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Speciality</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
};

export default AddDoctor;
