import React, { useState } from "react";
import { assets } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 98765 43210",
    address: "IIIT Bangalore, Karnataka, India",
    gender: "Male",
    profileImage: assets.profile_pic, // Replace with actual image
  });

  // Handle Input Change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-grow h-[80vh] items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl flex items-center">
        {/* Left - Profile Image & Name */}
        <div className="flex flex-col items-center w-1/3 border-r pr-6">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full shadow-md"
          />
          <h2 className="text-xl font-semibold text-gray-900 mt-3">
            {userData.name}
          </h2>
          <button
            className={`mt-4 px-5 py-2 text-white rounded-lg shadow-md ${
              isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
            onClick={toggleEdit}
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>

        {/* Right - User Info */}
        <div className="w-2/3 pl-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label className="text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border rounded-lg ${
                  isEditing ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-600">Phone</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border rounded-lg ${
                  isEditing ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border rounded-lg ${
                  isEditing ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
                }`}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-gray-600">Gender</label>
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full mt-1 p-2 border rounded-lg ${
                  isEditing ? "focus:ring-2 focus:ring-blue-400" : "bg-gray-100"
                }`}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
