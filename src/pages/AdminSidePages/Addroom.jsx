import React, { useState } from "react";
import Title from "../../UserSideComponents/SharedComponents/Title";
import { assets } from "../../assets/assets";

const Addroom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setIputs] = useState({
    roomType: "",
    pricePerNight: 0,
    amenities: {
      "Free WiFi": false,
      "Free Breakfast": false,
      "Room Service": false,
      "Mountain View": false,
      "River View": false,
      "Pool Access": false,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Form container with subtle shadow */}
        <form className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <Title
            align="left"
            font="lora"
            title="Add Room"
            subTitle="Provide complete and accurate room details, pricing, and amenities to help users make informed booking decisions."
          />

          {/* Image Upload Section */}
          <div className="mt-8">
            <p className="text-gray-700 mb-4 text-lg font-medium">
              Room Images
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.keys(images).map((key) => (
                <label
                  htmlFor={`roomImage${key}`}
                  key={key}
                  className="cursor-pointer group"
                >
                  <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden hover:border-indigo-300 transition-colors">
                    {images[key] ? (
                      <img
                        className="w-full h-full object-cover"
                        src={URL.createObjectURL(images[key])}
                        alt={`Room preview ${key}`}
                      />
                    ) : (
                      <div className="text-center p-4">
                        <div className="bg-gray-100 rounded-lg w-10 h-10 mx-auto flex items-center justify-center mb-2">
                          <img
                            src={assets.uploadArea}
                            alt="Upload icon"
                            className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <span className="text-gray-500 text-xs block">
                          Image {key}
                        </span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id={`roomImage${key}`}
                    hidden
                    onChange={(e) =>
                      setImages({ ...images, [key]: e.target.files[0] })
                    }
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Room Info Section */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Room Type */}
            <div>
              <label className="text-gray-700 block mb-2 font-medium">
                Room Type
              </label>
              <select
                value={inputs.roomType}
                onChange={(e) =>
                  setIputs({ ...inputs, roomType: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="">Select Room Type</option>
                <option value="Single Bed">Single Bed</option>
                <option value="Double Bed">Double Bed</option>
                <option value="Luxury Room">Luxury Room</option>
                <option value="Family Suite">Family Suite</option>
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-gray-700 block mb-2 font-medium">
                Price{" "}
                <span className="text-gray-500 text-sm font-normal">
                  /night
                </span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0"
                  min={1}
                  className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-transparent"
                  value={inputs.pricePerNight}
                  onChange={(e) =>
                    setIputs({ ...inputs, pricePerNight: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="mt-8">
            <label className="text-gray-700 block mb-3 font-medium">
              Amenities
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(inputs.amenities).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors"
                >
                  <input
                    type="checkbox"
                    id={`amenities${index + 1}`}
                    checked={inputs.amenities[amenity]}
                    onChange={() =>
                      setIputs({
                        ...inputs,
                        amenities: {
                          ...inputs.amenities,
                          [amenity]: !inputs.amenities[amenity],
                        },
                      })
                    }
                    className="h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`amenities${index + 1}`}
                    className="ml-3 text-gray-700 text-sm"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10 flex justify-end">
            <button
              type="button"
              className="py-3 px-8 bg-indigo-600 hover:bg-indigo-700 transition-colors text-white rounded-lg font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addroom;
