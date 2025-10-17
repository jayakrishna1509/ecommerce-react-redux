import React from 'react'
import banner from '../../assets/images/banner.png'

const HeroSection = () => {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden">
        <img
          className="w-full h-auto object-contain"
          src={banner}
          alt="Banner"
        />
      </div>
    </div>
  )
}

export default HeroSection
