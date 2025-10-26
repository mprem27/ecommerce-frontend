import React, { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'
import { Assets } from '../assets/Assets'
import Title from './Title'
import ProductCard from './ProductCard'

const BestSellers = () => {
  const { products } = useContext(ShopContext)
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState([true]);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(true);
      const bestProducts = products.filter((item) => (item.bestseller))
      setBestSellers(bestProducts.slice(0, 25));
      setLoading(false);
    }

  }, [products])
  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title SubHeading={"BestSellers"} mainTitle={"GoBok"} />
        <img src={Assets.bestsellers} alt="New collections image" className='w-full h-100% py-2 hover:p-3 transition-all ease-in-out duration-400 ' />
        {/* <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>
          Discover the charm of our <span className='font-semibold text-blue-600'>New Collection</span>, where every design blends elegance with modern trends. From bold colors to timeless patterns, each piece is crafted to reflect your unique style and confidence. Step into the season with outfits that speak comfort, creativity, and class — because fashion is not just what you wear, it’s how you express yourself.
        </p> */}
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-800'>
          Explore our <span className='font-semibold text-blue-500'>Bestsellers</span> — the must-have items loved by our customers. Each piece combines style, quality, and functionality, making them perfect for everyday wear or special occasions. Join the trendsetters and discover why these favorites keep flying off the shelves.
        </p>




      </div>
      <div className='grid grid-cols-1 place-items-center sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
          loading ?
            <p className='text-center col-span-full text-gary-600'>Loading...</p>
            :
            bestSellers.length === 0 ?
              <p className='text-center col-span-full text-gary-600'>No Products Found</p>
              :
              bestSellers.map((item, index) =>
                <ProductCard key={item._id || index} id={item._id} name={item.name} price={item.price} image={item.image} />
              )
        }
      </div>
    </div>
  )
}

export default BestSellers