// import React from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import Home from "./pages/Home";
// import Layout from "./Layouts/UserLayout";
// import AllRooms from "./pages/AllRooms";
// import RoomDetails from "./pages/RoomDetails";
// import MyBookings from "./pages/MyBookings";
// import HotelReg from "./pages/HotelReg";

// const App = () => {
//   const isOwnerPath = useLocation().pathname.includes('owner');

//   return (
//         <div className="min-h-[70vh]">
//       <Routes>
//         {!isOwnerPath && (

//           <Route element={<Layout />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/rooms" element={<AllRooms />} />
//             <Route path="/rooms/:id" element={<RoomDetails />} />
//             <Route path="/my-bookings" element={<MyBookings />} />
//           </Route>
//         )}

//         {/* Owner/Admin routes go here */}
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import UserLayout from "./Layouts/UserLayout";
import AllRooms from "./pages/UserSidePages/AllRooms";
import RoomDetails from "./pages/UserSidePages/RoomDetails";
import MyBookings from "./pages/UserSidePages/MyBookings";
import HotelReg from "./pages/HotelReg";
import AdminLayout from "./Layouts/AdminLayout";
import OwnerDashboard from "./pages/AdminSidePages/OwnerDashboard";
import Home from "./pages/UserSidePages/Home";
import Addroom from "./pages/AdminSidePages/Addroom";
import ListRoom from "./pages/AdminSidePages/ListRoom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="min-h-[70vh] relative">
      {!isOwnerPath}
      {false && <HotelReg />}

      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          <Route path="/hotel-reg" element={<HotelReg />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<AdminLayout />}>
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/add-room" element={<Addroom />} />
          <Route path="/owner/list-room" element={<ListRoom />} />
        </Route>
        {/* Owner/Admin routes go here */}
      </Routes>
    </div>
  );
};

export default App;
