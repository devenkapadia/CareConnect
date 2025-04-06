import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import {
  FiMail,
  FiUser,
  FiMapPin,
  FiHeart,
  FiAward,
  FiDollarSign,
  FiBookOpen,
} from "react-icons/fi";

const DoctorProfile = () => {
  const { doctorDetails, fetchDoctorDetails } = useContext(DoctorContext);

  useEffect(() => {
    fetchDoctorDetails();
  }, []);

  if (!doctorDetails) {
    return <div className="p-6 text-gray-600">Loading doctor profile...</div>;
  }

  const {
    name,
    specialization,
    years_of_experience,
    consultation_fee,
    about,
    image,
    degree,
    address,
  } = doctorDetails || {};

  const getValue = (val) =>
    val !== null && val !== undefined && val !== "" ? val : "Not provided";

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src={image || "https://via.placeholder.com/200"}
          alt="Doctor"
          className="w-36 h-36 object-cover rounded-full border-4 border-blue-200"
        />
        <div>
          <h1 className="text-4xl font-bold flex items-center gap-2">
            <FiUser className="text-blue-600" />
            {getValue(name)}
          </h1>
          <p className="mt-2 flex items-center text-lg">
            <FiHeart className="mr-2 text-red-500" />
            {getValue(specialization)}
          </p>
          <p className="mt-1 flex items-center">
            <FiAward className="mr-2 text-yellow-500" />
            {getValue(years_of_experience)} years experience
          </p>
          <p className="mt-1 flex items-center">
            <FiDollarSign className="mr-2 text-green-600" />
            ₹{getValue(consultation_fee)}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="mt-10 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FiBookOpen className="mr-2 text-indigo-500" /> About
          </h2>
          <p className="text-gray-700">{getValue(about)}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FiBookOpen className="mr-2 text-indigo-500" /> Degree
          </h2>
          <p className="text-gray-700">{getValue(degree)}</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 flex items-center">
            <FiMapPin className="mr-2 text-pink-500" /> Address
          </h2>
          <p className="text-gray-700">{getValue(address)}</p>
        </section>
      </div>

      {/* Contact Admin */}
      <div className="mt-10">
        <a
          href="mailto:admin@careconnet.com"
          className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          <FiMail className="mr-2" />
          Contact Admin
        </a>
      </div>
    </div>
  );
};

export default DoctorProfile;
