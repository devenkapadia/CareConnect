import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets_frontend/assets";
import { AppContext } from "../../context/AppContext";

const Contact = () => {
  const { sendFeedback } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comments: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.comments) {
      alert("Please fill out all fields.");
      return;
    }

    await sendFeedback(formData.name, formData.email, formData.comments);
    setFormData({ name: "", email: "", comments: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Have a question or need assistance? We’re here to help with any inquiries regarding 
            appointments, doctors, or services.
          </p>
        </div>
        <div className="flex-1">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-auto rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600">📞 Phone</h3>
          <p className="mt-2 text-gray-600">+91 98765 43210</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600">📧 Email</h3>
          <p className="mt-2 text-gray-600">support@healthcare.com</p>
        </div>
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-blue-600">📍 Location</h3>
          <p className="mt-2 text-gray-600">IIIT Bangalore, Karnataka, India</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-16 bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto transition-transform duration-300 hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Send Us a Feedback
        </h2>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
