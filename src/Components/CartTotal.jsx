import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'

const CartTotal = () => {
    const {products,currency,delivery_fee,cartItems,getCartAmount,getCartCount} = useContext(ShopContext);
    const [cartAmount, setCartAmount] = useState(0);

    useEffect(()=>{
        setCartAmount(getCartAmount())
    },[cartItems,products]);
  return (
   <div className='w-full'>
        <div className='flex flex-col gap-2 kt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Price ({getCartCount()} items) :</p>
                <p> { currency} {cartAmount}.00</p>
            </div>
            <hr className='border-gray-400'/>
            <div className='flex justify-between'>
                <p>Protect Promise Fee</p>
                <p> { currency} {delivery_fee}.00</p>
            </div>
            <hr className='border-gray-400'/>
            <div className='flex justify-between text-lg font-semibold py-10'>
                <p>Total Amount</p>
                <p> { currency} {cartAmount === 0 ? 0 : cartAmount+delivery_fee}.00</p>
            </div>
        </div>
      
    </div>
  )
}

export default CartTotal