import React from 'react'
import HotelCard from './HotelCard'
import { roomsDummyData } from '../../assets/assets'
import Title from '../SharedComponents/Title'
import { useNavigate } from 'react-router-dom'


const FeaturedDestinations = () => {
  const navigate= useNavigate()
  return (
    <div className='flex flex-col items-center px-6  md:px-16 lg:px-24  py-20  bg-gradient-to-b from-[#FFE4D4]/50 via-[#F3E5F5]/50 to-[#E0F7FA]/50
'>

      <Title title='Featured Destinations' subTitle='Discover luxury hotels in breathtaking cities across the globe, where comfort meets elegance and every stay is curated to perfection.'/>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[35px]'>

        {roomsDummyData?.slice(0,4).map((room, index)=>(
            <HotelCard key={room._id} room={room} index={index}/>
        ))}
      </div>
      <button onClick={()=>{navigate('/rooms'); scrollTo(0,0)}} className='my-[40px] px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'>
        View All
      </button>
    </div>
  )
}

export default FeaturedDestinations


