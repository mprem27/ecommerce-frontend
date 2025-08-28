import React from 'react'
import { Assets } from '../assets/Assets'

const Policy = () => {
  return (
    <div className='flex flex-col  mb-0 sm:flex-row justify-around gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={Assets.exchange} alt="Easy Exchange Policy" className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, veritatis perspiciatis corrupti excepturi eum necessitatibus recusandae facilis soluta nesciunt consectetur.</p>
      </div>
      <div>
        <img src={Assets.Return} alt="Up to 10 day's Return Policy" className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Up to 10 day's Return Policy</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, veritatis perspiciatis corrupti excepturi eum necessitatibus recusandae facilis soluta nesciunt consectetur.</p>
      </div>
      <div>
        <img src={Assets.quality} alt="excange" className='w-12 m-auto mb-5'/>
        <p className='font-semibold'>Best Quality Check</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, veritatis perspiciatis corrupti excepturi eum necessitatibus recusandae facilis soluta nesciunt consectetur.</p>
      </div>
        
    </div>
  )
}

export default Policy