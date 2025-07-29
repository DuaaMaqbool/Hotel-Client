
import React from 'react'
import { assets } from '../../assets/assets'
import Title from '../SharedComponents/Title'

const Newsletter = () => {
  return (
<div className='bg-gradient-to-b from-[#E0F7FA]/50 via-[#F3E5F5]/50 to-[#FFE4D4]/50 pt-10 pb-20'> 
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-14 md:py-20 mx-2 lg:mx-auto  bg-[#C9F0F3] text-gray-800 shadow-md">
      
      <Title 
        title="Join Our Journey" 
        subTitle="Stay updated with exclusive travel offers, stories, and insider tips!" 
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 w-full px-4 md:px-0">
        <input 
          type="text" 
          className="bg-white placeholder:text-gray-500 text-sm px-4 py-3 border border-gray-300 rounded-lg outline-none max-w-md w-full shadow-sm focus:ring-2 focus:ring-[#F4C67A]" 
          placeholder="Enter your email" 
        />
        <button className="flex items-center justify-center gap-2 group bg-[#F4C67A] hover:bg-[#e8b75c] text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200">
          Subscribe
          <img 
            src={assets.arrowIcon} 
            alt="arrow-icon" 
            className='w-4 group-hover:translate-x-1 transition-transform duration-200' 
          />
        </button>
      </div>

      <p className="text-gray-500 mt-6 text-xs text-center px-2">
        By subscribing, you agree to our Privacy Policy and consent to receive occasional updates from us.
      </p>
    </div>
    </div>
    
  )
}

export default Newsletter


