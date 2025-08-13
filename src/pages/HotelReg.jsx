import React from "react";
import { assets, cities } from "../assets/assets";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const HotelReg = ({ onClose }) => {

  const {axios, setIsOwner} = useAuth();
  // State variables for hotel registration
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  // const onSubmitHandler = async (event)=>{
  //   try {
  //     event.preventDefault();
  //     const {data} = await axios.post("/api/hotel", {name, contact, address, city}, {
  //       withCredentials: true,
  //     });
  //     if(data.success){
  //       toast.success(data.message)
  //       setIsOwner(true);
  //       onClose();
  //       // setShowHotelReg(false);
  //     }else{
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //      if (error.response && error.response.data && error.response.data.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Something went wrong. Please check your network and try again.");
  //     }
  //   }
  // }
const [isSubmitting, setIsSubmitting] = useState(false);

const onSubmitHandler = async (event) => {
  event.preventDefault();
  if (isSubmitting) return;
  setIsSubmitting(true);

  try {
    const response = await axios.post(
      "/api/hotel",
      { name, contact, address, city },
      { withCredentials: true }
    );

    const data = response.data;

    if (data && data.success) {
      toast.success(data.message || "Hotel registered");
      setIsOwner(true);
      onClose();
    } else {
      // backend returned 2xx but success flag is false
      toast.error(data?.message || "Server returned success=false");
    }
  } catch (error) {
    console.error("Axios error in /api/hotel:", error);
    // show backend message if present, else generic
    const serverMsg = error?.response?.data?.message;
    toast.error(serverMsg || error.message || "Something went wrong. Please check your network.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
      <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()} className="flex bg-white rounded-xl max-w-4xl max-md:mx-2">
        <img
          src={assets.regImage}
          alt="reg-image"
          className="w-1/2 rounded-xl hidden md:block"
        />

        <div className="relative flex flex-col items-center md:w-1/2 p-8 md:p-10">
          {/* Added onClick handler to the close icon */}
          <img
            src={assets.closeIcon}
            alt="close-icon"
            className="absolute top-4 right-4 h-4 w-4 cursor-pointer"
            onClick={onClose}
          />
          <p className="text-2xl font-semibold mt-6">Register Your Hotel</p>

          {/* Hotel name */}
          <div className="w-full mt-4">
            <label htmlFor="name" className="font-medium text-gray-500">
              Hotel Name
            </label>
            <input
              id="name" onChange={(e)=> setName(e.target.value)} value={name}
              type="text"
              placeholder="Type Here"
              className="border border-blue-400 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light "
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full mt-4">
            <label htmlFor="contact" className="font-medium text-gray-500">
              Phone
            </label>
            <input
              id="contact" onChange={(e)=> setContact(e.target.value)} value={contact}
              type="text"
              placeholder="Type Here"
              className="border border-blue-400 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light "
              required
            />
          </div>

          {/* aDDRESS */}
          <div className="w-full mt-4">
            <label htmlFor="address" className="font-medium text-gray-500">
              Address
            </label>
            <input
              id="address" onChange={(e)=> setAddress(e.target.value)} value={address}
              type="text"
              placeholder="Type Here"
              className="border border-blue-400 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light "
              required
            />
          </div>

          {/* select city */}
          <div className="w-full mt-4 max-w-[15rem] mr-auto">
            <label htmlFor="city" className="font-medium text-gray-500">
              City
            </label>
            <select
              id="city" onChange={(e)=> setCity(e.target.value)} value={city}
              className="border border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 font-light"
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={isSubmitting} className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6">
            {isSubmitting ? "Registering..." : "Register"}
      
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;