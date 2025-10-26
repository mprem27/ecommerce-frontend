import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Assets } from '../assets/Assets';
import { useContext } from 'react';
import { ShopContext } from '../../contexts/ShopContexts';

const Header = () => {
  const { token, setToken, navigate, getCartCount } = useContext(ShopContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const logout = () => {
    setToken('');
    localStorage.setItem('token', "");
    navigate("/login");
  }

  if (location.pathname === "/login") return ("");

  return (
    <div className='px-4 fixed z-20 top-0 left-0 w-full flex items-center justify-between py-2 border-b-2 rounded-md font-medium bg-[#bae6fd]'>
      {/* Logo */}
      <Link to={'/'} className='items-center justify-center text-[#121238]'>
        <img src={Assets.logoheader} alt="logoheader" className='h-13 sm:h-15 w-auto translate-y-2 object-contain mb-1 scale-150' />
      </Link>

      {/* Navigation Links */}
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

      {/* Right Section */}
      <div className='flex items-center gap-3 sm:gap-6 relative'>
        {/* Search Bar & Icon */}
        <div className='flex items-center gap-1 relative'>
          {showSearch && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchQuery.trim() !== "") {
                  navigate(`/Collections?search=${encodeURIComponent(searchQuery.trim())}`);
                  setShowSearch(false);
                }
              }}
              placeholder="Find Deals You’ll Love"
              className='px-3 py-1 w-48 sm:w-60 rounded-lg border border-gray-400 outline-none focus:ring-2 focus:ring-blue-400 transition-all bg-white text-gray-700'
            />
          )}
          <img
            src={Assets.search}
            onClick={() => {
              if (showSearch && searchQuery.trim() !== "") {
                navigate(`/Collections?search=${encodeURIComponent(searchQuery.trim())}`);
                setShowSearch(false);
              } else {
                setShowSearch(!showSearch);
              }
            }}
            alt="Search icon"
            className='w-5 sm:w-7 cursor-pointer'
          />
        </div>



        {/* Profile Menu */}
        <div className='relative'>
          <img
            onClick={() => {
              if (!token) navigate("/login");
              else setShowMenu(!showMenu);
            }}
            src={Assets.profile}
            alt="profile"
            className='w-5 sm:w-7 cursor-pointer'
          />

          {token && showMenu && (
            <div className='absolute right-0 mt-2 w-36 py-3 px-5 bg-[#bfdbfe] text-gray-600 rounded shadow-md'>
              <NavLink to={'/profile'} className='block hover:text-black mb-1' onClick={() => setShowMenu(false)}>Profile</NavLink>
              <NavLink to={'/orders'} className='block hover:text-black mb-1' onClick={() => setShowMenu(false)}>Orders</NavLink>
              <button onClick={() => { logout(); setShowMenu(false); }} className='block hover:text-black w-full text-left'>Logout</button>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link className='relative' to={'/Cart'}>
          <img src={Assets.cart} alt="cart icon" className='w-5 sm:w-7  cursor-pointer' />
          <p className='absolute right-[-5px] top-[-5px] w-4 text-center leading-4 bg-blue-400 text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
      </div>
    </div>
  )
}

export default Header
