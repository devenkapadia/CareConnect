import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

const AddDoctor = () => {
  const { addDoctor } = useContext(AdminContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    started_year: "",
    consultation_fee: "",
    about: "",
    image: "",
    degree: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Convert consultation_fee and started_year to proper types
    const doctorData = {
      ...formData,
      consultation_fee: parseFloat(formData.consultation_fee),
      started_year: parseInt(formData.started_year),
    };

    await addDoctor(doctorData);
    navigate("/admin/doctors");
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>
      <form onSubmit={handleSubmit}>
        
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full p-2 border rounded"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Specialization */}
        <div className="mb-4">
          <label className="block text-gray-700">Specialization</label>
          <input
            type="text"
            name="specialization"
            className="w-full p-2 border rounded"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
        </div>

        {/* Started Year */}
        <div className="mb-4">
          <label className="block text-gray-700">Started Year</label>
          <input
            type="number"
            name="started_year"
            className="w-full p-2 border rounded"
            value={formData.started_year}
            onChange={handleChange}
            required
          />
        </div>

        {/* Consultation Fee */}
        <div className="mb-4">
          <label className="block text-gray-700">Consultation Fee</label>
          <input
            type="number"
            step="0.01"
            name="consultation_fee"
            className="w-full p-2 border rounded"
            value={formData.consultation_fee}
            onChange={handleChange}
            required
          />
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block text-gray-700">About</label>
          <textarea
            name="about"
            className="w-full p-2 border rounded"
            value={formData.about}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            className="w-full p-2 border rounded"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        {/* Degree */}
        <div className="mb-4">
          <label className="block text-gray-700">Degree</label>
          <input
            type="text"
            name="degree"
            className="w-full p-2 border rounded"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 border rounded"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
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
