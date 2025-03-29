import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PatientLayout;
