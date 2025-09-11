import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../contexts/ShopContexts';



const Product = () => {
   const {products,addToCart} = useContext(ShopContext)
  const { Productid } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [Quantity, setQuantity] = useState(1)

  const IncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  }
  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  }

  const fetchProduct = () => {
    products.map((item) => {
      if (item._id == Productid) {
        setProductData(item);
        setImage(item.image[0]);
        
      }
    })
  }
  useEffect(() => {
    fetchProduct();
  }, [Productid, products])

  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='flex gap-10 sm:gap-12 flex-col sm:flex-row'>
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex images-scroll sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData?.image.map((item, index) => (
                <img key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex cursor-pointer' onClick={() => setImage(item)} />
              ))
            }

          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className='w-full h-auto' alt={productData.name} />

          </div>
        </div>
        <div className='flex-1 flex flex-col gap-2'>
          <h1 className='font-bold text-4xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-3'>

            <p>4.3</p>

            <div className=''>
              <span className='text-[#FFD700]'>★</span>
              <span className='text-[#FFD700]'>★</span>
              <span className='text-[#FFD700]'>★</span>
              <span className='text-[#FFD700]'>★</span>
              <span >✰</span>
            </div>

            <a href="#">287 ratings</a>
          </div>
          <p className='mt-5 ml-2 text-3xl font-medium'>RS {productData.price}</p>
          <p className='mt-5 ml-2 text-xl font-medium text-grat-500 md:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-4'>
            <p>Select Size : </p>
            <div className='flex gap-1'>
              {
                productData.sizes.map((item, index) => (
                  <button className={`cursor-pointer px-4 py-2 bg-gray-300 border rounded ${item === size ? 'border-blue-900 bg-orange-50' : 'border-gray-400 hover:bg-gray-200'}`}
                    onClick={() => setSize(item)} key={index}>{item}</button>
                ))
                
              }
              
            </div>
            <div className='flex gap-2 '> <button onClick={decreaseQuantity} className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'>-</button> 
            <input type="number" value={Quantity} min={1} className='w-12 text-center border rounded ' readOnly/> 
            <button onClick={IncreaseQuantity} className='px-3 py-1 bg-gray-300 rounded hover:bg-gray-400'>+</button> 
            </div>

            <button onClick={()=>addToCart(productData._id,size )} className='bg-blue-300 rounded-xl text-black px-8 py-3 text-sm cursor-pointer hover:bg-blue-400'>Add to Cart</button>
            <button className='bg-blue-300 rounded-xl text-black px-8 py-3 text-sm cursor-pointer hover:bg-blue-400'>Buy</button>

          </div>
        </div>
      </div>
    </div>


  ) : (
    <div>No Product Found</div>
  )
}

export default Product