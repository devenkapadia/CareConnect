import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { UserContext } from "../../context/UserContext";
import { assets } from "../../assets/assets_frontend/assets";
import Cookies from "js-cookie";

const Appointment = () => {
  const { docId } = useParams();

  const { fetchDoctorById, currencySymbol, doctors } = useContext(AppContext);
  const { patients, fetchPatients, createAppointment } =
    useContext(UserContext);

  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const token = Cookies.get("token");

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const getDoctor = async () => {
      if (token) await fetchPatients();
      const doc = await fetchDoctorById(docId);
      setDocInfo(doc);
      console.log(docInfo);
    };

    getDoctor();
  }, [docId, fetchDoctorById]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    if (docSlots.length > 0 && selectedDay >= docSlots.length) {
      setSelectedDay(0); // Reset to first available day if index is out of range
    }
  }, [docSlots]);

  useEffect(() => {
    const getAvailableSlots = () => {
      const today = new Date();
      const slots = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today);
        currentDate.setDate(today.getDate() + i);

        const formattedDate = currentDate
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("-"); // Format: DD-MM-YYYY

        const timeSlots = [];

        for (let h = 9; h < 21; h++) {
          const startHour = h.toString().padStart(2, "0");
          const endHour = (h + 1).toString().padStart(2, "0");
          const slotLabel = `${startHour}:00 - ${endHour}:00`; // Match backend format

          const isAvailable =
            docInfo?.slots_available?.[formattedDate]?.includes(slotLabel) ||
            false;

          const hour12 = h % 12 === 0 ? 12 : h % 12;
          const ampm = h < 12 ? "AM" : "PM";
          const timeLabel = `${hour12}:00 ${ampm}`;

          timeSlots.push({
            datetime: new Date(currentDate.setHours(h, 0, 0, 0)),
            time: timeLabel,
            available: isAvailable,
          });
        }

        slots.push(timeSlots);
      }

      setDocSlots(slots);
    };

    getAvailableSlots();
  }, [docId, docInfo]);

  if (!docInfo) {
    return <p>Loading...</p>;
  }

  const selectedSlotObj =
    selectedSlot !== null ? docSlots[selectedDay][selectedSlot] : null;
  const selectedPatient = patients.find(
    (p) => p.patient_id === selectedPatientId
  );

  console.log("slot obj", selectedSlotObj);

  const handleConfirmBooking = async () => {
    const slot = docSlots[selectedDay][selectedSlot];
    console.log("Selected Slot:", slot);

    const dateObj = slot.datetime;

    const [year, month, day] = dateObj.toISOString().split("T")[0].split("-");
    const formattedDate = `${day}-${month}-${year}`;

    // Extract hour (e.g., from "19:00 PM" get "19")
    const hour = slot.time.split(":")[0];

    const payload = {
      doctor_id: docId,
      patient_id: selectedPatientId,
      date: formattedDate,
      time: `${hour}:00`,
    };

    try {
      const res = await createAppointment(payload);
      console.log("Booking Success:", res);
      alert("Appointment booked successfully!");
      navigate("/my-appointments");
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while booking.");
    }
  };

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
              {docInfo.specialization}
            </p>

            <button className="px-6 py-2 text-md font-medium bg-blue-100 text-blue-800 rounded-full shadow-md">
              {docInfo.years_of_experience} Years of Experience
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

        {/* Booking Section */}
        {token ? (
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Booking Slots
            </h1>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Select Patient
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">-- Select Patient --</option>
                {patients.map((patient) => (
                  <option key={patient.patient_id} value={patient.patient_id}>
                    {patient.first_name} {patient.last_name}
                  </option>
                ))}
              </select>
            </div>
            {/* Days Navigation */}
            <div className="flex justify-center gap-4 overflow-x-auto pb-4">
              {docSlots &&
                docSlots.map((daySlots, index) => (
                  <button
                    key={index}
                    className={`px-6 py-4 w-36 rounded-lg text-lg font-semibold transition 
                ${
                  selectedDay === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                    onClick={() => {
                      setSelectedDay(index);
                      setSelectedSlot(null);
                    }}
                  >
                    <p>{daysOfWeek[new Date(daySlots[0].datetime).getDay()]}</p>
                    <p className="text-xl font-bold">
                      {new Date(daySlots[0].datetime).getDate()}
                    </p>
                  </button>
                ))}
            </div>

            {/* Time Slots */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {docSlots.length > 0 && docSlots[selectedDay] ? (
                docSlots[selectedDay].map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="relative group" // Added group for hover effect
                  >
                    <button
                      className={`w-full h-20 rounded-lg font-medium text-lg flex items-center justify-center border 
                    transition-all hover:shadow-lg
                    ${
                      slot.available
                        ? selectedSlot === slotIndex
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-800 border-gray-300"
                        : "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed"
                    }`}
                      onClick={() =>
                        slot.available && setSelectedSlot(slotIndex)
                      }
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </button>

                    {/* Tooltip on hover */}
                    {!slot.available && (
                      <div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-10 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap"
                      >
                        Slot not available
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-600 text-md col-span-full">
                  No slots available
                </p>
              )}
            </div>

            {/* Confirm Button */}
            <div className="mt-10 text-center">
              <button
                className={`px-10 py-4 text-lg font-semibold rounded-lg shadow-md transition
            ${
              selectedSlot !== null && selectedPatientId !== ""
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
                disabled={selectedSlot === null || selectedPatientId === ""}
                onClick={() => setShowModal(true)}
              >
                Book an Appointment
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-10 text-center">
            <button
              className={`px-10 py-4 text-lg font-semibold rounded-lg shadow-md transition bg-green-500 text-white hover:bg-green-600`}
              onClick={() => navigate("/login")}
            >
              Login to Book
            </button>
          </div>
        )}
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
                    doc.specialization === docInfo.specialization &&
                    doc.doctor_id !== docInfo.doctor_id
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
                      alt={doctor.specialization}
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

        {/* Confirmation Modal */}
        {showModal && selectedSlotObj && selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-lg w-full text-center">
              <h2 className="text-2xl font-bold mb-4">Confirm Appointment</h2>
              <p className="text-gray-700 mb-3">
                Patient:{" "}
                <span className="font-semibold">
                  {selectedPatient.first_name} {selectedPatient.last_name}
                </span>
              </p>
              <p className="text-gray-700 mb-3">
                Date:{" "}
                <span className="font-semibold">
                  {new Date(selectedSlotObj.datetime)
                    .toLocaleDateString("en-GB")
                    .replaceAll("/", "-")}
                </span>
              </p>
              <p className="text-gray-700 mb-6">
                Time:{" "}
                <span className="font-semibold">{selectedSlotObj.time}</span>
              </p>
              <div className="flex justify-center gap-6">
                <button
                  className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600"
                  onClick={handleConfirmBooking}
                >
                  Confirm
                </button>
                <button
                  className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default Appointment;
