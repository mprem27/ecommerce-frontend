import React from 'react'
import { Link } from 'react-router-dom';


const ProductCard = ({ id, name, image, price }) => {
  const imgSrc = Array.isArray(image) ? image[0] : image || '/fallback.jpg';
  
  return (
    <Link to={`/product/${id}`} className='text-black-900 rounded-xl cursor-pointer p-1 w-[230px] h-[350px] shadow-md bg-[#ffffff] hover:scale-102 hover:border-[1.5px] border-blue-400 transition-all ease-in-out duration-500 '>
      <div className='overflow-hidden '>
        <img src={imgSrc} alt={name} className='w-[220px] rounded-t-lg rounded-b h-[260px] bg-[#f5f5dc] object-cover transition-transform duration-300 ' />
      </div>
           <p className='pt-3 pb-1 text-sm font-bold'>{name}</p>
      <p className='text-sm font-medium'>₹ {price}</p>
    </Link>
  )
}

export default ProductCard