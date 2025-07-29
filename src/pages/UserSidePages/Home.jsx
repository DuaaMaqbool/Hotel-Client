import React from 'react'

import FeaturedDestinations from '../../UserSideComponents/HomePageComponents/featuredDestinations'
import ExclusiveOffers from '../../UserSideComponents/HomePageComponents/ExclusiveOffers'
import Testimonial from '../../UserSideComponents/HomePageComponents/Testimonial'
import Newsletter from '../../UserSideComponents/HomePageComponents/Newsletter'
import Hero from '../../UserSideComponents/HomePageComponents/Hero'

const Home = () => {
  return (
    <>
      <Hero/>
      <FeaturedDestinations/>
      <ExclusiveOffers/>
      <Testimonial/>
      <Newsletter/>
    </>
  )
}

export default Home
