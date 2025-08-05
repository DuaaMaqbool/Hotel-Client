import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../AdminSideComponents/Navbar";
import HotelReg from "../pages/HotelReg";
import Sidebar from "../AdminSideComponents/Sidebar";

const OwnerLayout = () => {
  // State to control the visibility of the hotel registration modal
  const [showRegModal, setShowRegModal] = useState(false);

  // This function will be passed as a prop to the Navbar
  const handleListHotel = () => {
    setShowRegModal(true);
  };

  const handleCloseModal = () => {
    setShowRegModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Pass the handler function down to the Navbar */}
      <Navbar onListHotel={handleListHotel} />

      <div className="flex flex-row flex-1 w-full">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Conditionally render the modal based on state, passing the close handler */}
      {showRegModal && <HotelReg onClose={handleCloseModal} />}
    </div>
  );
};

export default OwnerLayout;
