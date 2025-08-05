// import React from 'react';
// import Navbar from '../UserSideComponents/HomePage/Navbar';
// import Footer from '../UserSideComponents/HomePage/Footer';
// import { Outlet, useLocation } from 'react-router-dom';

// const UserLayout = () => {
//   const isOwnerPath = useLocation().pathname.includes('owner');

//   return (
//     <>
//       {!isOwnerPath && <Navbar />}
//       <main className="min-h-[70vh]">
//         <Outlet />
//       </main>
//       {!isOwnerPath && <Footer />}
//     </>
//   );
// };

// export default UserLayout;

// src/layouts/Layout.jsx
import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../UserSideComponents/SharedComponents/Navbar";
import Footer from "../UserSideComponents/SharedComponents/Footer";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <main className=" min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
