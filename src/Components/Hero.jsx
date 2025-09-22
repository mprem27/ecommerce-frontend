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
      <div className='relative flex flex-col sm:flex-row items-center w-full h-70 sm:h-[500px] bg-cover bg-no-repeat bg-center rounded-b-xl rounded-t-md  overflow-hidden px-4 sm:px-8 mt-2' style={{ backgroundImage: `url(${Assets.herobg2})` }}  >
        <div className='w-full place-items-center sm:w-1/2 flex justify-center py-10 sm:py-2'>
          {/* <div className='text-[#333]'>
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
          </div> */}
        </div>
        <img src={Assets.images[currentIndex]} alt="hero-images" className='block sm:hidden absolute bottom-3 right-4 w-48 h-28 object-cover rounded-lg shadow-md' />
        <img src={Assets.images[currentIndex]} alt="hero-images" className='hidden sm:block absolute bottom-1 left-3  w-[490px] h-[250px] scale-80 object-cover rounded-xl shadow-md' />
      </div>
    </div>
  );

}

export default Hero