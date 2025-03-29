import React from "react";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const doctors = [
    { id: 1, name: "Dr. Richard James", speciality: "Cardiologist" },
    { id: 2, name: "Dr. Alice Brown", speciality: "Neurologist" }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Doctors List</h1>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4">Name</th>
            <th className="p-4">Speciality</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id} className="border-b">
              <td className="p-4">{doc.name}</td>
              <td className="p-4">{doc.speciality}</td>
              <td className="p-4">
                <Link
                  to={`/admin/doctors/${doc.id}/edit`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </Link>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsList;
