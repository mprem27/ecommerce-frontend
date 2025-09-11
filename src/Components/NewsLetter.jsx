import React from 'react'
import { useLocation } from 'react-router-dom';

const NewsLetter = () => {
  const location = useLocation();

  if (location.pathname === "/login" ){
    return ("");
  }
  return (
    <div className='py-4  bg-[#1e1c2ae5] place-items-center border-b-1 rounded border-white justify-center '>
      <div className='text-xl grid gap-3 text-white '>
        <p className='uppercase font-semibold text-center '>Be in the Know</p>
        <p>Get inspiration,new arrivals and the latest offers to your inbox</p>
        <button className='w-1/2 py-2 rounded-xl text-black bg-[#fff] mx-auto hover:scale-105 bg-gray-300 transition-all ease-in-out duration-700'>Sign me up for emails</button>
        
      </div>
    </div>
  )
}

export default NewsLetter