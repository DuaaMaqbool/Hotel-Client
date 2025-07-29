// import React from 'react'
// import { Link } from 'react-router-dom'

// const Navbar = () => {
//   return (
//     <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300'>
//         <Link to='/' className='text-2xl md:text-4xl font-lora font-bold tracking-wide'>
//         JetSetStays</Link>
        
      
//     </div>
//   )
// }

// export default Navbar


// src/AdminSideComponents/Navbar.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   return (
//     <div className="w-full px-4 md:px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
//       <div className="max-w-7xl mx-auto">
//         <Link to="/owner" className="flex items-center">
//           <div className="flex items-center space-x-2">
            
//               <h1 className="text-2xl md:text-4xl font-bold font-lora text-white tracking-wide">
//                 JetSetStays
//               </h1>
        
            
//           </div>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// src/AdminSideComponents/Navbar.jsx
// src/AdminSideComponents/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiSettings, FiLogOut, FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const userMenuItems = [
    { icon: <FiUser className="mr-2 text-lg" />, label: 'My Profile', path: '/profile' },
    { icon: <FiSettings className="mr-2 text-lg" />, label: 'Settings', path: '/settings' },
    { icon: <FiHelpCircle className="mr-2 text-lg" />, label: 'Help Center', path: '/help' },
    { icon: <FiLogOut className="mr-2 text-lg" />, label: 'Logout', path: '/logout' }
  ];

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
        
        <div className="relative" ref={dropdownRef}>
          <button 
            className="flex items-center space-x-2 group"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold">
                <span className="text-lg">A</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-700"></div>
            </div>
            
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-white/80">admin@jetsetstays.com</p>
            </div>
            
            <FiChevronDown 
              className={`text-white/80 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 overflow-hidden border border-gray-200">
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@jetsetstays.com</p>
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
