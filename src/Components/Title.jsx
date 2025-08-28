import React from 'react'

const Title = ({mainTitle,SubHeading}) => {
  return (
    <div className='inline-block item-center mb-3'>
    <div className='inline-flex gap-1 item-center'>
        <p className=' text-gray-900 text-xl font-bold'>{mainTitle}</p>
        <p className='text-gary-500'>{SubHeading}</p>
        <p className='w-8 sm:w-12 h-[1.5px] sm:h-[2px] bg-[#f28d23]'></p>
    </div>
    <p className='w-25  sm:w-20 h-[2px] sm:h-[2px] bg-[#f28d23] '></p>
    </div>
  )
}

export default Title