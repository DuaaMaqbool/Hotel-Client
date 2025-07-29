import React from "react";
import Title from "../SharedComponents/Title";
import { assets, exclusiveOffers } from "../../assets/assets";

const ExclusiveOffers = () => {
  return (
    <div className="flex flex-col items-center md:first-line:px-16 lg:px-24 xl:px-32 pt-1 pb-30 w-full py-20 px-4 bg-gradient-to-b from-[#E0F7FA]/50 via-[#F3E5F5]/50 to-[#FFE4D4]/50 ">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <Title
          align="left"
          title=" Exclusive Offers"
          subTitle="Experience luxury without the premium price tag — our exclusive offers bring you handpicked stays, unbeatable rates, and extra perks designed to make your next getaway unforgettable"
        />
        <button className="group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12">
          View All Offers
          <img
            src={assets.arrowIcon}
            alt="arrow-icon"
            className="group-hover:translate-x-1 transition-all"
          />
        </button>
      </div> 

      {/* Exclusive offers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {Array.isArray(exclusiveOffers) && exclusiveOffers.length > 0 ? (
          exclusiveOffers.map((item) => (
            <div
              key={item._id}
              style={{ backgroundImage: `url(${item?.image})` }}
              className="group relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-repeat bg-cover bg-center"
            >
              <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                {item.priceOff}% OFF
              </p>
              <div>
                <p className="text-2xl font-medium font-lora">{item?.title}</p>
                <p>{item.description}</p>
                <p className="text-xs text-white/70 mt-3">Expires {item.expiryDate}</p>
              </div>
              <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                View Offers
                <img
                  className="invert group-hover:translate-x-1 transition-all"
                  src={assets.arrowIcon}
                  alt="arrow-icon"
                />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No exclusive offers available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExclusiveOffers;

