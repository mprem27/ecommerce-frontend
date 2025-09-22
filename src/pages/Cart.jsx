import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'
import { Assets } from '../assets/Assets';
import CartTotal from '../Components/CartTotal';


const Cart = () => {
  const { products, cartItems, setCartItems, currency, navigate, updateQuantity, } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    if (products.length > 0) {
      const tempCart = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item]) {
            tempCart.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempCart);
    }
  }, [cartItems, products])




  return (

    <div className='w-full mx-auto mt-5 px-4'>
      <div className='py-5 mb-5'>
        <h2 className='text-3xl font-bold text-center text-orange-500'>{products.length > 0 && cartData.length > 0 ? "Your Cart Products" : "Your Cart"}</h2>
      </div>
      <div>
        {
          products.length > 0 && cartData.length > 0 ? (
            <div className='flex flex-col lg:flex-row gap-6'>
              <div className='w-full lg:w-2/3 flex flex-col gap-4 max-h-[700px] overflow-y-auto '>
                {
                  cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;
                    return (
                      <div key={index} className='flex flex-row items-center gap-4 w-full shadow-lg rounded-xl border border-blue-200 bg-blue-50 p-4 hover:shadow-xl transition-shadow duration-300' >
                        <img src={productData.image[0]} alt={productData.name} className='w-28 h-50 sm:w-40 sm:h-60 object-cover rounded-xl' />
                        <div className='text-left flex flex-col gap-2'>
                          <p className='font-semibold text-lg'>{productData.name}</p>
                          <p className='line-clamp-3 font-semibold sm:line-clamp-4 text-gray-700 text-sm'>{productData.description}</p>
                          <p className='font-semibold text-lg'>{currency}{productData.price}</p>
                          <div className='flex gap-3 mt-2'>
                            <p className='font-medium text-gray-800 border border-gray-400 px-2 py-1 rounded'>{item.size}</p>
                            <span className='font-medium text-gray-800 border border-gray-400  rounded'> Qty :<input onChange={(e) => e.target.value === "" || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} type='Number' min={1} defaultValue={item.quantity}
                              className='text-gray-800 max-w-10 text-center outline-none sm:max-w-12 px-1 sm:px-2 py-1 font-medium ' /></span>
                          </div>
                          <button onClick={() => updateQuantity(item._id, item.size, 0)} className='font-medium text-gray-800 border border-gray-400 rounded-md hover:bg-blue-400 border-blue-800 transition-all ease-in-out duration-500'>Remove</button>
                        </div>
                      </div>


                    );
                  })}
              </div>
              <div className='w-full h-[250px] lg:w-1/3 flex flex-col justify-start items-start bg-white p-4 rounded-xl border border-blue-200 shadow-sm'>
                <p className='text-lg font-semibold text-blue-700 mb-2'>Price Details</p>
                <CartTotal />
                <button onClick={() => navigate('/place-order')} className='bg-orange-400 text-white text-lg my-10 px-8 py-3 cursor-pointer'>Place Order</button>

              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <img src={Assets.emptycart} alt="empty cart" className='w-60 h-60 object-contain mb-5' />
              <p className='text-xl text-gray-700 font-semibold py-2'>Your Cart is Empty</p>
              <p className='text-md text-gray-500 max-w-md text-center'> Explore our wide selection and find something you like </p>
            </div>
          )}
      </div>
    </div>

  )

}

export default Cart

