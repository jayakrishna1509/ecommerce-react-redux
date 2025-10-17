import React from 'react'

const HeroSection = () => {
  return (
    <div className="w-full">
      <div className="w-full overflow-hidden">
        <img 
          className='w-full h-auto object-contain' 
          src="./src/assets/images/banner.png" 
          alt="Banner" 
        />
      </div>
    </div>
  )
}

export default HeroSection
