import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import PatientLayout from "./layouts/PatientLayout";
import AdminLayout from "./layouts/AdminLayout";
import DoctorLayout from "./layouts/DoctorLayout";

import Home from "./Pages/Home";
import Doctors from "./Pages/Doctors";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import MyProfile from "./Pages/MyProfile";
import MyAppointments from "./Pages/MyAppointments";
import Appointment from "./Pages/Appointment";

import AdminDashboard from "./Pages/AdminDashboard";
import DoctorDashboard from "./Pages/DoctorDashboard";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Patient Routes */}
        <Route path="/" element={<PatientLayout />}>
          <Route index element={<Home />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="doctors/:speciality" element={<Doctors />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="appointment/:docId" element={<Appointment />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DoctorDashboard />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
};


export default App;
