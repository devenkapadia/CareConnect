import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDocInfo = () => {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo || null);
    };
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docSlots.length > 0 && selectedDay >= docSlots.length) {
      setSelectedDay(0); // Reset to first available day if index is out of range
    }
  }, [docSlots]);

  useEffect(() => {
    const getAvailableSlots = () => {
      let today = new Date();
      let slots = [];

      for (let i = 0; i < 7; i++) {
        let currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        let timeSlots = [];
        for (let h = 10; h <= 20; h++) {
          let time = `${h}:00 AM`;
          if (h >= 12) {
            time = `${h === 12 ? 12 : h - 12}:00 PM`;
          }
          timeSlots.push({ datetime: new Date(currentDate), time });
        }

        slots.push(timeSlots);
      }

      setDocSlots(slots);
    };

    getAvailableSlots();
  }, []);

  return (
    docInfo && (
      <div className="max-w-5xl mx-auto p-6 rounded-xl">
        {/* Doctor Details */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Doctor Image */}
          <div className="w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden shadow-lg border-4 border-gray-200">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-6">
            <p className="text-3xl font-semibold flex items-center gap-3">
              {docInfo.name}
              <img
                src={assets.verified_icon}
                alt="Verified"
                className="w-6 h-6"
              />
            </p>

            <p className="text-gray-700 text-lg">
              <span className="font-medium">{docInfo.degree}</span> -{" "}
              {docInfo.speciality}
            </p>

            <button className="px-6 py-2 text-md font-medium bg-blue-100 text-blue-800 rounded-full shadow-md">
              {docInfo.experience} Years of Experience
            </button>

            <div className="pt-4 border-t border-gray-300">
              <p className="font-semibold text-xl text-gray-800 flex items-center gap-3">
                About
                <img src={assets.info_icon} alt="Info" className="w-5 h-5" />
              </p>
              <p className="text-gray-600 text-md leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            <p className="text-lg font-semibold text-gray-800">
              Appointment Fees:{" "}
              <span className="text-green-600">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Booking Slots
          </p>

          {/* Days Row */}
          <div className="flex justify-center gap-3 overflow-x-auto py-2">
            {docSlots &&
              docSlots.map((daySlots, index) => (
                <button
                  key={index}
                  className={`px-5 py-3 text-md font-semibold rounded-full border border-gray-300 shadow-sm 
                ${
                  selectedDay === index
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-800"
                }`}
                  onClick={() => {
                    setSelectedDay(index);
                    setSelectedSlot(null);
                  }}
                >
                  <p>{daysOfWeek[daySlots[0].datetime.getDay()]}</p>
                  <p className="text-lg">{daySlots[0].datetime.getDate()}</p>
                </button>
              ))}
          </div>

          {/* Slots for Selected Day */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {docSlots.length > 0 && docSlots[selectedDay] ? (
              docSlots[selectedDay].map((slot, slotIndex) => (
                <button
                  key={slotIndex}
                  className={`px-4 py-2 rounded-full border border-gray-300 text-md font-semibold 
        ${
          selectedSlot === slotIndex
            ? "bg-blue-500 text-white"
            : "bg-white text-gray-700"
        }`}
                  onClick={() => setSelectedSlot(slotIndex)}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="text-gray-600 text-md">No slots available</p>
            )}
          </div>

          {/* Confirm Button */}
          <div className="mt-6 text-center">
            <button
              className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition"
              disabled={selectedSlot === null}
            >
              Book an appointment
            </button>
          </div>
        </div>

        {/* Related Doctors Section */}
        {docInfo && doctors && (
          <div className="mt-10">
            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Related Doctors
            </h2>

            {/* Doctors Grid - 5 per row on large screens */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
              {doctors
                .filter(
                  (doc) =>
                    doc.speciality === docInfo.speciality &&
                    doc._id !== docInfo._id
                )
                .slice(0, 10) // Show only 10 related doctors
                .map((doctor) => (
                  <div
                    key={doctor._id}
                    className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                    onClick={() => {
                      navigate(`/appointment/${doctor._id}`);
                      scrollTo(0, 0);
                    }}
                  >
                    {/* Doctor Image */}
                    <img
                      src={doctor.image}
                      alt={doctor.speciality}
                      className="w-30 h-30 object-cover transition-transform duration-300 hover:scale-110"
                    />

                    {/* Doctor Info */}
                    <div className="text-center mt-4 w-full">
                      <p
                        className="text-base font-medium text-gray-800 truncate w-50 mx-auto"
                        title={doctor.name} // Full name on hover
                      >
                        {doctor.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {doctor.speciality}
                      </p>
                      <div className="mt-2 px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                        Available
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Appointment;
