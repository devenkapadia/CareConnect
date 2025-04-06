import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext.jsx";
import { DoctorProvider } from "./context/DoctorContext.jsx";
import { UserProvider } from "./context/UserContext.jsx";

import { Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Layouts
import PatientLayout from "./layouts/PatientLayout";
import AdminLayout from "./layouts/AdminLayout";
import DoctorLayout from "./layouts/DoctorLayout";

// Patient Routes
import Home from "./Pages/patient/Home.jsx";
import Doctors from "./Pages/patient/Doctors.jsx";
import Login from "./Pages/patient/Login.jsx";
import About from "./Pages/patient/About.jsx";
import Contact from "./Pages/patient/Contact.jsx";
import MyProfile from "./Pages/patient/MyProfile.jsx";
import MyAppointments from "./Pages/patient/MyAppointments.jsx";
import Appointment from "./Pages/patient/Appointment.jsx";

// Admin Routes
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import DoctorsList from "./Pages/admin/DoctorsList.jsx";
import AddDoctor from "./Pages/admin/AddDoctor.jsx";
import AppointmentsList from "./Pages/admin/Appointments.jsx";
import EditDoctor from "./Pages/admin/EditDoctor.jsx";

// Doctor Routes
import DoctorDashboard from "./Pages/doctor/DoctorDashboard.jsx";
import Appointments from "./Pages/doctor/Appointments.jsx";
import AppointmentDetails from "./Pages/doctor/AppointmentDetails.jsx";
import DoctorUnavailability from "./Pages/doctor/DoctorUnavailability.jsx";
import DoctorProfile from "./Pages/doctor/DoctorProfile.jsx";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const App = () => {
  var role = "PATIENT";
  const token = Cookies.get("token");
  var decoded;
  if (token) {
    decoded = jwtDecode(token);
    role = decoded.role;
  }
  return (
    <AuthProvider>
      <AdminProvider>
        <DoctorProvider>
          <UserProvider>
            <Routes>
              {/* Patient Routes */}
              <Route
                path="/"
                element={
                  role === "PATIENT" ? (
                    <PatientLayout />
                  ) : (
                    <Navigate to={`/${decoded.role.toLowerCase()}`} replace />
                  )
                }
              >
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
                  <ProtectedRoute allowedRoles={["ADMIN"]}>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="doctors" element={<DoctorsList />} />
                <Route path="doctors/add" element={<AddDoctor />} />
                <Route path="doctors/:id/edit" element={<EditDoctor />} />
                <Route path="appointmentsList" element={<AppointmentsList />} />
              </Route>

              {/* Doctor Routes */}
              <Route
                path="/doctor"
                element={
                  <ProtectedRoute allowedRoles={["DOCTOR"]}>
                    <DoctorLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DoctorDashboard />} />
                <Route path="appointments" element={<Appointments />} />
                <Route
                  path="appointments/:id"
                  element={<AppointmentDetails />}
                />
                <Route
                  path="unavailability"
                  element={<DoctorUnavailability />}
                />
                <Route path="/doctor/profile" element={<DoctorProfile />} />
              </Route>

              <Route path="/login" element={<Login />} />
            </Routes>
          </UserProvider>
        </DoctorProvider>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
