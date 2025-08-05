import React from "react";
import Title from "../SharedComponents/Title";
import { assets, testimonials } from "../../assets/assets";
import StarRating from "./StarRating";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center px-16 md:px-16 lg:px-24 pt-2 bg-gradient-to-b from-[#FFE4D4]/50 via-[#F3E5F5]/50 to-[#E0F7FA]/50">
      <Title
        title="What Our Guests Say"
        subTitle="See what our guests have to say about their unforgettable experiences, exceptional service, and memorable stays with us."
      />

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-[40px] w-full justify-items-center mb-20">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full"
                  src={testimonial.image}
                  alt={testimonial.name}
                />
                <div>
                  <p className="font-playfair text-xl">{testimonial.name}</p>
                  <p className="text-gray-500">{testimonial.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-gray-500 max-w-90 mt-4">
                "{testimonial.review}"
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No testimonials available right now.
          </p>
        )}
      </div>
    </div>
  );
};

export default Testimonial;
