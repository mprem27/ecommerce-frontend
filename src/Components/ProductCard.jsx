import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, name, image, price }) => {
  const imgSrc = Array.isArray(image) ? image[0] : image || '/fallback.jpg';

  // Generate a consistent "random" delivery date based on product ID
  const generateConsistentDeliveryDate = (id) => {
    // Convert product id to number for deterministic pseudo-random
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const randomDays = (Math.abs(hash) % 5) + 3; // 3 to 7 days
    const baseDate = new Date();
    baseDate.setDate(baseDate.getDate() + randomDays);
    return baseDate.toLocaleDateString();
  };

  const deliveryDate = generateConsistentDeliveryDate(id);

  return (
    <Link
      to={`/product/${id}`}
      className='text-black-900 rounded-xl cursor-pointer p-1 w-[230px] h-[380px] shadow-md bg-[#ffffff] hover:scale-102 hover:border-[1.5px] border-blue-400 transition-all ease-in-out duration-500'
    >
      <div className='overflow-hidden'>
        <img
          src={imgSrc}
          alt={name}
          className='w-[220px] rounded-t-lg rounded-b h-[260px] bg-[#f5f5dc] object-cover transition-transform duration-300'
        />
      </div>
      <p className='pt-3 pb-1 text-sm font-bold'>{name}</p>
      <p className='text-sm font-medium'>₹ {price}</p>
      {/* Consistent Delivery Date */}
      <p className='text-xs text-gray-700 mt-1'>
        Delivery expected by: <span className='font-semibold'>{deliveryDate}</span>
      </p>
    </Link>
  );
};

export default ProductCard;
