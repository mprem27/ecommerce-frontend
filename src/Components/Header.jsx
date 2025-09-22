import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Assets } from '../assets/Assets';
import { useContext } from 'react';
import { ShopContext } from '../../contexts/ShopContexts';




const Header = () => {

  const {token,setToken,navigate,getCartCount} = useContext(ShopContext);
  
  const logout = () => {
    setToken('');
    localStorage.setItem('token',"");
    navigate("/login");
  }

  const location = useLocation();

  if (location.pathname === "/login" ){
    return ("");
  }

  return (
    <div className='px-4 fixed z-20 top-0 left-0 w-full flex items-center justify-between py-2  border-b-2 rounded-md font-medium bg-[#bae6fd] '>
      <Link to={'/'} className='items-center justify-center text-[#121238]'><img src={Assets.logoheader} alt="logoheader" className='h-15 w-auto translate-y-2 object-contain mb-1 scale-150' /></Link>
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
          <img onClick={() => {token ? "" : navigate("/login")}} src={Assets.profile} alt="profile image" className='w-7 cursor-pointer' />

          {
            token ?
              <div className='group-hover:block absolute hidden  right-0 pt-4'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5  bg-[#bfdbfe] text-gray-600 rounded '>
                  <NavLink to={'/profile'} className='hover:text-black' >Profile</NavLink>
                  <NavLink to={'/orders'} className='hover:text-black' >Orders</NavLink>
                  <NavLink onClick={() => logout()} className='hover:text-black' >Logout</NavLink>
                </div>

              </div>
              : ""
          }
        </div>
        <Link className='relative' to={'/Cart'}> <img src={Assets.cart} alt="cart icon" className='w-7 cursor-pointer' />
        <p className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-blue-400 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
         </Link>
      </div>

    </div>
  )
}


export default Header