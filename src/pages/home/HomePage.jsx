import React from 'react'
import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCart from '../../components/homePageProductCart/HomePageProductCart'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import Loader from '../../components/loader/Loader'


const HomePage = () => {
  
  return (
      <Layout>
        <HeroSection/>
        <Category/>
        <HomePageProductCart/>
        <Track/>
        <Testimonial/>
       <Loader/>
      </Layout>
  )
}

export default HomePage
