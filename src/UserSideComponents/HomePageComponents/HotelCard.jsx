import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      to={"/rooms/" + room._id}
      onClick={() => scrollTo(0, 0)}
      className="relative max-w-xs w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Image wrapper */}
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <img
          src={room.images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
        {index % 2 === 0 && (
          <p className="px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full shadow">
            Best Seller
          </p>
        )}
      </div>

      {/* Info section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <p className="font-lora text-xl font-medium text-gray-800">
            {room.hotel.name}
          </p>
          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="star-icon" className="h-4" />
            <span className="text-sm">4.5</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm mt-1 text-gray-600">
          <img src={assets.locationIcon} alt="location-icon" className="h-4" />
          <span>{room.hotel.address}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-800 text-sm">
            <span className="text-lg font-semibold">${room.pricePerNight}</span>
            /night
          </p>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100 transition-all">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
