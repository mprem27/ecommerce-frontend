import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import { Assets } from '../assets/Assets';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/login" ){
    return ("");
  }
  return (
    <div className='px-4  bg-[#1e1c2ae5]'>
      <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10 pt-4 text-sm'>
        <div >
      <Link to={'/'} className='items-center justify-center text-[#121238]'><img src={Assets.logofooter} alt="logoheader" className='h-15 w-auto  object-contain mb-1 scale-120 ml-5' /></Link>
          <p className='w-full md:w-2/3 text-gray-300 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis corrupti aut totam veniam, consequatur quo ad, eius culpa cumque laborum nisi, quisquam ducimus. Culpa maxime facilis cum expedita quas amet.</p>
        </div>
        <div>

          <p className='text-xl text-white font-medium mb-5'>Company</p>
          <ul className=' flex flex-col gap-1 text-gray-300'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy & Policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-medium  text-white mb-5'>Contact with Us</p>
          <ul className='flex flex-col gap-1 text-gray-300'>
            <li>Facebook</li>
            <li>tiwtter</li>
            <li>Instagram</li>
            <li>+91 1800 0012 7115</li>
            <li>contact@GoBok.com</li>
          </ul>
        </div>
        <div>
          <p className='text-xl text-white font-medium mb-5'>Help </p>
          <ul className='flex flex-col gap-1 text-gray-300'>
            <li>account</li>
            <li>Returns Center</li>
            <li>Product Safty Alert</li>
            <li>Help</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='py-5 text-sm text-gray-200 text-center'>© 2025, GoBok.com. The future of shopping.</p>
    </div>
  )
}

export default Footer