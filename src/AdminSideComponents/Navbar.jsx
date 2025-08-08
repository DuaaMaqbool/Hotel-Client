// import React, { useState, useRef, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
// import { useAppContext } from "../context/AuthContext";


// const Navbar = ({ onListHotel }) => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null);

//   const { user, logout, isAuthenticated } = useAppContext();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       setShowDropdown(false);
//       navigate("/");
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const userMenuItems = [];

//   return (
//     <div className="w-full px-4 md:px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <Link to="/owner" className="flex items-center">
//           <div className="flex items-center space-x-2">
//             <h1 className="text-2xl md:text-4xl font-bold font-lora text-white tracking-wide">
//               JetSetStays
//             </h1>
//           </div>
//         </Link>

//         <div className="flex items-center space-x-4">
//           {isAuthenticated && user?.role === "hotelOwner" && (
//             // This button now calls the onListHotel prop
//             <button
//               onClick={onListHotel}
//               className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-md"
//             >
//               List your hotel
//             </button>
//           )}

//           {isAuthenticated && user && (
//             <div className="relative" ref={dropdownRef}>
//               <button
//                 className="flex items-center space-x-2 group"
//                 onClick={() => setShowDropdown(!showDropdown)}
//               >
//                 <div className="relative">
//                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
//                     <span className="text-lg">
//                       {user?.username?.charAt(0)?.toUpperCase()}
//                     </span>
//                   </div>
//                   <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-700"></div>
//                 </div>

//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium text-white">
//                     {user?.username}
//                   </p>
//                   <p className="text-xs text-white/80">{user?.email}</p>
//                 </div>

//                 <FiChevronDown
//                   className={`text-white/80 transition-transform duration-300 ${
//                     showDropdown ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {showDropdown && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
//                   <div className="p-4 border-b border-gray-100 bg-gray-50">
//                     <p className="font-medium text-gray-900">
//                       {user?.username}
//                     </p>
//                     <p className="text-xs text-gray-500">{user?.email}</p>
//                   </div>

//                   <div className="py-1">
//                     {userMenuItems.map((item, index) => (
//                       <Link
//                         key={index}
//                         to={item.path}
//                         className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
//                         onClick={() => setShowDropdown(false)}
//                       >
//                         {item.icon}
//                         <span>{item.label}</span>
//                       </Link>
//                     ))}
//                     <button
//                       onClick={handleLogout}
//                       className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors duration-200"
//                     >
//                       <FiLogOut className="mr-2 text-lg" />
//                       <span>Logout</span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiChevronDown } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ onListHotel }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setShowDropdown(false);
      navigate("/");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userMenuItems = [];

  return (
    <div className="w-full px-4 md:px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/owner" className="flex items-center">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl md:text-4xl font-bold font-lora text-white tracking-wide">
              JetSetStays
            </h1>
          </div>
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated && user?.role === "hotelOwner" && (
            // This button now calls the onListHotel prop
            <button
              onClick={onListHotel}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-md"
            >
              List your hotel
            </button>
          )}

          {isAuthenticated && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 group"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                    <span className="text-lg">
                      {user?.username?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-700"></div>
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">
                    {user?.username}
                  </p>
                  <p className="text-xs text-white/80">{user?.email}</p>
                </div>

                <FiChevronDown
                  className={`text-white/80 transition-transform duration-300 ${
                    showDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
                  <div className="p-4 border-b border-gray-100 bg-gray-50">
                    <p className="font-medium text-gray-900">
                      {user?.username}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <div className="py-1">
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors duration-200"
                    >
                      <FiLogOut className="mr-2 text-lg" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;