// import React, { useState } from "react";
// import Title from "../../UserSideComponents/SharedComponents/Title";
// import { assets, dashboardDummyData } from "../../assets/assets";

// const OwnerDashboard = () => {
//   const [dashboardData, setDasgboardData] = useState(dashboardDummyData);
//   return (
//     <div className="p-6">
//       <Title
//         align="left"
//         font="lora"
//         title="Dashboard"
//         subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
//       />
//       <div className="flex gap-4 my-8">
//         {/* Ttal Bookings */}
//         <div className=" bg-gray-400/10 border border-gray-400/30 rounded flex p-4 pr-8 ">
//           <img
//             src={assets.totalBookingIcon}
//             alt=""
//             className="max-sm:hidden h-10"
//           />
//           <div className="flex flex-col sm:ml-4 font-medium">
//             <p className="text-blue-500 text-lg">Total Bookings</p>
//             <p className="text-neutral-400 text-base">
//               {dashboardData.totalBookings}
//             </p>
//           </div>
//         </div>
//         {/* Total Revenue */}
//         <div className="bg-gray-400/10 border border-gray-400/30 rounded flex p-4 pr-8">
//           <img
//             src={assets.totalRevenueIcon}
//             alt=""
//             className="max-sm:hidden h-10"
//           />
//           <div className="flex flex-col sm:ml-4 font-medium">
//             <p className="text-blue-500 text-lg">Total Revenue</p>
//             <p className="text-neutral-400 text-base">
//               ${dashboardData.totalRevenue}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* recent bookings */}
//       <h2 className="text-gray-500 text-xl font-medium mb-5">
//         Recent Bookings
//       </h2>
//       <div className="w-full max-w-3xl text-left border border-gray-300 rounded-lg max-h-80 overflow-y-scroll">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="py-3 px-4 text-gray-800 font-medium">User Name</th>
//               <th className="py-3 px-4 text-gray-800 font-medium max-sm:hidden">
//                 Room Name
//               </th>
//               <th className="py-3 px-4 text-gray-800 font-medium text-center">
//                 Total Amount
//               </th>
//               <th className="py-3 px-4 text-gray-800 font-medium text-center">
//                 Payment Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="text-sm">
//             {dashboardData?.bookings.map((item, index)=>(
//               <tr key={index}>
//                 <td className="py-3 px-4 text-gray border-t border-gray-300">
//                   {item.user.username}
//                 </td>
//                 <td className="py-3 px-4 text-gray border-t border-gray-300 max-sm:hidden">
//                   {item.room.roomType}
//                 </td>
//                 <td className="py-3 px-4 text-gray border-t border-gray-300 text-center">
//                  $ {item.totalPrice}
//                 </td>
//                 <td className="py-3 px-4 border-t border-gray-300 flex">
//                   <button className={`py-1 px-3 txt-xs rounded-full mx-auto ${item.isPaid ? 'bg-green-200 text-green-600': 'bg-amber-200 text-yellow-600'}`}>
//                     {item.isPaid ? 'Completed' : 'Pending'}
//                   </button>
//                 </td>

//               </tr>
//             ) )}

//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default OwnerDashboard;


import React, { useState } from "react";
import Title from "../../UserSideComponents/SharedComponents/Title";
import { assets, dashboardDummyData } from "../../assets/assets";

const OwnerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(dashboardDummyData);
  
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-16">
      <div className="max-w-7xl mx-auto">
        <Title
          align="left"
          font="lora"
          title="Dashboard"
          subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
        />
        
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4 my-8">
          {/* Total Bookings */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-1 min-w-[200px]">
            <div className="flex items-center">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <img
                  src={assets.totalBookingIcon}
                  alt="Bookings"
                  className="h-8 w-8"
                />
              </div>
              <div className="ml-3">
                <p className="text-gray-500 text-sm font-medium">Total Bookings</p>
                <p className="text-xl font-bold text-gray-800">
                  {dashboardData.totalBookings}
                </p>
              </div>
            </div>
          </div>
          
          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200 flex-1 min-w-[200px]">
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg">
                <img
                  src={assets.totalRevenueIcon}
                  alt="Revenue"
                  className="h-8 w-8"
                />
              </div>
              <div className="ml-3">
                <p className="text-gray-500 text-sm font-medium">Total Revenue</p>
                <p className="text-xl font-bold text-gray-800">
                  ${dashboardData.totalRevenue}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-gray-800 text-lg sm:text-xl font-medium">
              Recent Bookings
            </h2>
            
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium text-sm">User Name</th>
                  <th className="py-3 px-4 text-left text-gray-700 font-medium text-sm max-sm:hidden">
                    Room Name
                  </th>
                  <th className="py-3 px-4 text-center text-gray-700 font-medium text-sm">
                    Total Amount
                  </th>
                  <th className="py-3 px-4 text-center text-gray-700 font-medium text-sm">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-200">
                {dashboardData?.bookings.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700">
                      <div className="flex items-center">
                        
                        {item.user.username}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 max-sm:hidden">
                      {item.room.roomType}
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-center font-medium">
                      ${item.totalPrice}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span 
                        className={`inline-block py-1 px-3 rounded-full text-xs font-medium ${
                          item.isPaid 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.isPaid ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;