import React, { useEffect, useState } from 'react'
import { Assets } from '../assets/Assets'

const Hero = () => {
  const images = Assets.images;      
  const bgImages = Assets.bgimage;  
  const [bgIndex, setBgIndex] = useState(0);    
  const [smallIndex, setSmallIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSmallIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='-mx-4 sm:-mx-[5vh] md:-mx-[7vh] lg:-mx-[9vh]'>
      <div
        className='relative flex flex-col sm:flex-row items-center w-full h-70 sm:h-[500px] bg-cover bg-no-repeat bg-center rounded-b-xl rounded-t-md overflow-hidden px-4 sm:px-8 mt-2'
        style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      >
        <div className='w-full place-items-center sm:w-1/2 flex justify-center py-10 sm:py-2'>
          {/* Sale text can go here */}
        </div>

        {/* Small auto-sliding image */}
        <img
          src={images[smallIndex]}
          alt="hero-images"
          className='block sm:hidden absolute bottom-3 right-4 w-48 h-28 object-cover rounded-lg shadow-md'
        />
        <img
          src={images[smallIndex]}
          alt="hero-images"
          className='hidden sm:block absolute bottom-1 left-3 w-[490px] h-[250px] scale-80 object-cover rounded-xl shadow-md'
        />

        {/* Dot buttons for background only */}
        <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
          {bgImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setBgIndex(i)}
              className={`w-3 h-3 rounded-full ${i === bgIndex ? 'bg-white scale-110' : 'bg-gray-400'} transition-all`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero
