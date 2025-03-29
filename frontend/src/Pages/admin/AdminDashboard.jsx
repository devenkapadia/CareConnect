import React from "react";

const AdminDashboard = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Patients</h2>
          <p className="text-4xl">120</p>
        </div>

        <div className="p-6 bg-green-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Doctors</h2>
          <p className="text-4xl">30</p>
        </div>

        <div className="p-6 bg-yellow-500 text-white rounded-lg shadow">
          <h2 className="text-lg font-bold">Total Transactions</h2>
          <p className="text-4xl">$15,000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
