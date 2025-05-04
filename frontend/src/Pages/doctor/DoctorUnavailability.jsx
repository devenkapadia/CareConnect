import React, { useState, useEffect, useContext } from "react";
import { CheckCircle, Clock, Ban } from "lucide-react";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorUnavailability = () => {
  const {
    doctorDetails,
    fetchDoctorDetails,
    getUnavailableSlots,
    markSlotUnavailable,
    unavailabileSlots,
    setunavailabileSlots
  } = useContext(DoctorContext);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlots, setSelectedSlots] = useState({});
  const [loading, setLoading] = useState(false);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]); // YYYY-MM-DD
    }
    return dates;
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = 9 + i;
    const start = `${hour.toString().padStart(2, "0")}:00`;
    const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
    return `${start} - ${end}`;
  });

  const fetchData = async () => {
    if (!doctorDetails) {
      await fetchDoctorDetails();
    }

    try {
      const data = await getUnavailableSlots();
      const grouped = {};

      const formatTime = (timeStr) => timeStr.slice(0, 5);

      data.forEach((slot) => {
        const date = slot.date;
        const timeSlot = `${formatTime(slot.startTime)} - ${formatTime(slot.endTime)}`;
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(timeSlot);
      });

      setunavailabileSlots(grouped);
    } catch (error) {
      console.error("Error loading unavailable slots", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSlot = (date, slot) => {
    // Prevent toggle if already unavailable
    console.log(date);
    console.log(unavailabileSlots[date]);
    console.log(slot);
    
    if (unavailabileSlots[date]?.includes(slot)) return;
    
    setSelectedSlots((prev) => {
      const existing = prev[date] || [];
      const updated = existing.includes(slot)
        ? existing.filter((s) => s !== slot)
        : [...existing, slot];

      return { ...prev, [date]: updated };
    });
  };

  const handleSave = async () => {
    setLoading(true);

    const slotsToMark = {};
    Object.entries(selectedSlots).forEach(([date, slots]) => {
      slotsToMark[date] = slots;
    });

    console.log(slotsToMark);
    
    try {
      await markSlotUnavailable(slotsToMark);
      alert("Slots marked as unavailable");
      setSelectedSlots({});
      await fetchData();
    } catch (error) {
      alert("Failed to mark slots", error);
    }

    setLoading(false);
  };

  const dates = generateDates();

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="max-w mx-auto p-8">
  {/* Header */}
  <div className="mb-10 text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-1">Manage Unavailable Slots</h2>
    <p className="text-sm text-gray-500">Select dates and mark time slots when you’re unavailable.</p>
  </div>

  {/* Date Picker */}
  <div className="flex flex-wrap justify-center gap-3 mb-10">
    {dates.map((date) => (
      <button
        key={date}
        onClick={() => setSelectedDate(date)}
        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
          selectedDate === date
            ? "bg-indigo-600 text-white border-indigo-700 shadow-md"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-300"
        }`}
      >
        {formatDate(date)}
      </button>
    ))}
  </div>

  {/* Time Slots */}
  {selectedDate && (
    <>
      <h3 className="text-lg font-semibold text-center mb-5 text-gray-700">
        Select time slots for <span className="text-indigo-600">{formatDate(selectedDate)}</span>
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
        {timeSlots.map((slot, index) => {
          const isUnavailable = unavailabileSlots[selectedDate]?.includes(slot);
          const isSelected = selectedSlots[selectedDate]?.includes(slot);

          return (
            <button
              key={index}
              onClick={() => toggleSlot(selectedDate, slot)}
              disabled={isUnavailable}
              className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                isUnavailable
                  ? "bg-gray-300 text-gray-100 cursor-not-allowed border-gray-400"
                  : isSelected
                  ? "bg-red-500 text-white border-red-600 shadow-md scale-[1.03]"
                  : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
              }`}
            >
              {isUnavailable ? <Ban size={16} /> : isSelected ? <CheckCircle size={16} /> : <Clock size={16} />}
              {slot}
            </button>
          );
        })}
      </div>
    </>
  )}

  {/* Save Button */}
  <div className="text-center">
    <button
      onClick={handleSave}
      disabled={loading || Object.keys(selectedSlots).length === 0}
      className={`inline-block px-10 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md ${
        loading || Object.keys(selectedSlots).length === 0
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900"
      }`}
    >
      {loading ? "Saving..." : "Save Unavailability"}
    </button>
  </div>
</div>

  );
};

export default DoctorUnavailability;
