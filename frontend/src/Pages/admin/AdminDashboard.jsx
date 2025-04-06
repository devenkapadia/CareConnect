import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const AdminDashboard = () => {
  const { stats, fetchStats } = useContext(AdminContext);

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center text-lg mt-8">Loading...</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Users */}
        <div className="p-6 bg-blue-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-4xl">{stats.users}</p>
        </div>

        {/* Total Doctors */}
        <div className="p-6 bg-green-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Doctors</h2>
          <p className="text-4xl">{stats.doctors}</p>
        </div>

        {/* Total Appointments */}
        <div className="p-6 bg-yellow-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Appointments</h2>
          <p className="text-4xl">{stats.appointments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
