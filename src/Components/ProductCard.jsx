import React,{useState,useEffect}from 'react'
import { Link } from 'react-router-dom';
import { Products } from '../assets/Assets';

const ProductCard = ({ id, name, image, price }) => {
  const imgSrc = Array.isArray(image) ? image[0] : image || '/fallback.jpg';
  
  return (
    <Link to={`/product/${id}`} className='text-black-900 rounded-xl cursor-pointer p-1 w-[230px] h-[350px] bg-[#ffffff] '>
      <div className='overflow-hidden'>
        <img src={imgSrc} alt={name} className='w-[220px] h-[260px] hover:scale-103 transition-all ease-in-out bg-[#f5f5dc]' />
      </div>
           <p className='pt-3 pb-1 text-sm font-bold'>{name}</p>
      <p className='text-sm font-medium'>{price}</p>
    </Link>
  )
}

export default ProductCard