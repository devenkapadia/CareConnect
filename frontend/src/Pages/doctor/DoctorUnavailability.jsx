import React, { useState } from "react";

const DoctorUnavailability = () => {
  const [unavailableSlots, setUnavailableSlots] = useState([]);

  const toggleSlot = (slot) => {
    setUnavailableSlots((prev) =>
      prev.includes(slot)
        ? prev.filter((s) => s !== slot)
        : [...prev, slot]
    );
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => `${9 + i}:00`);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Mark Unavailability</h1>

      <div className="grid grid-cols-3 gap-4">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`p-4 border rounded-lg ${
              unavailableSlots.includes(slot)
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
            }`}
            onClick={() => toggleSlot(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DoctorUnavailability;
