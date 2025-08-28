import React, { useEffect, useState } from 'react'
import { Assets } from '../assets/Assets'

const Hero = () => {

  const images = Assets.images;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className='-mx-4 sm:-mx-[5vh] md:-mx-[7vh] lg:-mx-[9vh]'>
      <div className='flex flex-col sm:flex-row items-center w-full h-70 sm:h-[500px] bg-cover bg-center rounded-3xl overflow-hidden px-4 sm:px-8' style={{ backgroundImage: `url(${Assets.herobg2})` }}  >
        <div className='w-full place-items-center sm:w-1/2 flex justify-center py-10 sm:py-2'>
          <div className='text-[#333]'>
            <p className=' text-5xl sm:text-6xl font-extrabold text-orange-400 [text-shadow:_2px_2px_6px_black]'>
              Dussehra Sale
            </p>
            <h1 className='text-3xl place-items-center ml-15 sm:text-4xl lg:text-5xl font-bold text-white sm:py-3 leading-relaxed [text-shadow:_3px_3px_8px_black]'>
              70% <del className='text-xl lg:text-2xl'>50%</del> OFF
            </h1>
            <div className='flex flex-col items-center justify-center gap-2 group cursor-pointer mx-auto'>
              <p className='font-bold sm:text-xl md:text-2xl lg:text-3xl text-white [text-shadow:_1px_1px_4px_black]'>
                Shop Now
              </p>
              <p className='w-10 md:w-11 h-[2px] bg-white group-hover:w-30 transition-all ease-in-out duration-700'></p>
            </div>
          </div>
        </div>
        <img src={Assets.images[currentIndex]} alt="hero" className='hidden sm:block sm:w-1/2 h-[300px] object-cover mt-8 rounded-xl mr-10 shadow-[0_4px_20px_rgba(255,255,255,0.8)]' />
      </div>
      <div className="flex sm:hidden justify-center items-center mt-6">
        <img src={Assets.images[currentIndex]} alt="hero" className="w-full h-[300px] object-cover rounded-xl shadow-[0_4px_20px_rgba(255,255,255,0.8)]" />
      </div>
    </div>
  );

}

export default Hero