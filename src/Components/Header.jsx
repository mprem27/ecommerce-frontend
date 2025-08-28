import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Assets } from '../assets/Assets';
const Header = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <div className='px-4 w-full flex items-center justify-between py-2  border-b-2 rounded-md font-medium bg-[#bae6fd] '>
      <Link to={'/'} className='text-3xl grid items-center justify-center text-[#121238]'>GoBok<span className='text-6xl mb-6 text-[#60a5fa] leading-0 inline-flex transform scale-x-200 px-5'>⤻</span></Link>
      <ul className='hidden sm:flex gap-5 text-base text-gray-700'>

        <NavLink to={'/'} className='flex flex-col items-start group gap-1'>
          <p>Home</p>
          <div className='w-3/4 h-[1px] bg-[#60a5fa] opacity-0 group-hover:opacity-100'></div>
        </NavLink>

        <NavLink to={'/Collections'} className='flex flex-col items-start group gap-1'>
          <p>Collections</p>
          <div className='w-3/4 h-[1px] bg-[#60a5fa] opacity-0 group-hover:opacity-100'></div>
        </NavLink>

        <NavLink to={'/Todaysdeals'} className='flex flex-col items-start group gap-1'>
          <p>Today's deals</p>
          <div className='w-3/4 h-[1px] bg-[#60a5fa] opacity-0 group-hover:opacity-100'></div>
        </NavLink>

        <NavLink to={'/About'} className='flex flex-col items-start group gap-1'>
          <p>About</p>
          <div className='w-3/4 h-[1px] bg-[#60a5fa] opacity-0 group-hover:opacity-100'></div>
        </NavLink>

        <NavLink to={'/Contact'} className='flex flex-col items-start group gap-1'>
          <p>Contact</p>
          <div className='w-3/4 h-[1px] bg-[#60a5fa] opacity-0 group-hover:opacity-100'></div>
        </NavLink>
      </ul>
      <div className='flex items-center gap-6'>
        <img src={Assets.search} alt="Search icon" className='w-7 cursor-pointer' />

        <div className='group relative'>
          <img onClick={() => setIsUserLoggedIn(!isUserLoggedIn)} src={Assets.profile} alt="profile image" className='w-7 cursor-pointer' />

          {
            isUserLoggedIn ?
              <div className='group-hover:block absolute hidden  right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-[#bfdbfe] text-gray-600 rounded '>
                  <NavLink to={'/profile'} className='hover:text-black' >Profile</NavLink>
                  <NavLink to={'/orders'} className='hover:text-black' >Orders</NavLink>
                  <NavLink onClick={() => (setIsUserLoggedIn(!isUserLoggedIn))} className='hover:text-black' >Logout</NavLink>
                </div>

              </div>
              : ""
          }
        </div>
        <Link to={'/Cart'}> <img src={Assets.cart} alt="cart icon" className='w-7 cursor-pointer' /> </Link>
      </div>

    </div>
  )
}


export default Header