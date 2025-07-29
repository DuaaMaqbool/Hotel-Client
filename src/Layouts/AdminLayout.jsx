import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../AdminSideComponents/Navbar";
import Sidebar from "../AdminSideComponents/Sidebar";
import Footer from "../UserSideComponents/SharedComponents/Footer";

const AdminLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
      <Navbar />

      {/* Main content area: sidebar + page content */}
      <div className="flex flex-row min-h-screen w-full">
        <Sidebar />
        <main className="flex-1  overflow-y-auto ">
          <Outlet />
        </main>
      </div>

      {/* Footer below everything */}
      <Footer />
    </div>
  );
};

export default AdminLayout;


