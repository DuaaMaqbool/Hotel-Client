// import React from "react";
// import { assets } from "../assets/assets";
// import { sidebarLinks } from "../../data";
// import { NavLink } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="border-r h-full min-h-screen text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
//       {sidebarLinks?.map((item, index) => (
//         <NavLink
//           to={item.path}
//           key={index}
//           end="/owner"
//           className={({ isActive }) =>
//             `flex items-center py-3 px-4 md:px-8 gap-3 ${
//               isActive
//                 ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-indigo-600 text-blue"
//                 : "hover:bg-gray-100/90 border-white text-gray-700"
//             }`
//           }
//         >
//           <img src={item.icon} alt={item.name} className="min-h-6 min-w-6" />
//           <p className="md:block hidden text-center">{item.name}</p>
//         </NavLink>
//       ))}
//     </div>
//   );
// };

import React from "react";
import { assets } from "../assets/assets";
import { sidebarLinks } from "../../data";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="border-r border-gray-200 bg-white h-full min-h-screen pt-6 px-2 flex flex-col transition-all duration-300 md:w-60">
      {sidebarLinks?.map((item, index) => (
        <NavLink
          to={item.path}
          key={index}
          end
          className={({ isActive }) =>
            `flex items-center rounded-lg py-3 px-4 gap-3 mb-1 transition-all duration-200 ${
              isActive
                ? "bg-indigo-100 text-indigo-700 font-semibold shadow-sm"
                : "text-gray-700 hover:bg-gray-100"
            }`
          }
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-5 h-5 shrink-0"
          />
          <span className="hidden md:inline text-sm">{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;

