import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const MyProfile = () => {
  const token = Cookies.get("token");
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    profileImage: "",
  });

  // Decode JWT Token and Populate User Data
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUserData({
        name: decoded.name || "N/A",
        email: decoded.email || "N/A",
        phone: decoded.phone || "N/A",
        address: decoded.address || "N/A",
        gender: decoded.gender || "N/A",
        profileImage: decoded.profileImage || assets.profile_pic, // Handle profile image
      });
    } else {
      console.log("token");
    }
  }, [token]);

  // Handle Input Change
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Toggle Edit Mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle Save Changes
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the header
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedData = await response.json();
      console.log("Profile updated:", updatedData);

      // Exit edit mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      {/* Profile Image and Details */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Image Section */}
        <div className="md:w-1/3 bg-blue-500 flex justify-center items-center p-10">
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-64 h-64 rounded-full border-4 border-white shadow-lg"
          />
        </div>

        {/* Profile Info Section */}
        <div className="md:w-2/3 p-10">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">My Profile</h1>

          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="text-lg font-semibold">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-4 border rounded-lg ${
                  isEditing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                disabled
                className="w-full p-4 border rounded-lg bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-lg font-semibold">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-lg font-semibold">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full p-4 border rounded-lg ${
                    isEditing ? "bg-white" : "bg-gray-100"
                  }`}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-lg font-semibold">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full p-4 border rounded-lg ${
                  isEditing ? "bg-white" : "bg-gray-100"
                }`}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-8">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
                >
                  Save
                </button>
                <button
                  onClick={toggleEdit}
                  className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={toggleEdit}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyProfile;
