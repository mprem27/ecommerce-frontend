import React, { useContext, useState } from 'react'
import { ShopContext } from '../../contexts/ShopContexts';
import CartTotal from '../Components/CartTotal';
import Title from '../Components/Title';
import { Assets } from '../assets/Assets';
import axios from 'axios';
import { toast } from 'react-toastify';


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');

  const { delivery_fee, BackendURL, cartItems, setCartItems, products, token, navigate, getCartAmount } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    zipcode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    country: '',
    landmark: '',
    alternatephone: ''
  });

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const initPay = (order) => {
        const dbOrderId = order.receipt;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Order Payment',
          description: 'Order Payment',
          order_id: order.id,
          // receipt: order.receipt,
          handler: async (response) => {
            try {
              const verificationData = {...response,orderId: dbOrderId };
              const { data } = await axios.post(BackendURL + '/api/order/verifyRazorpay', verificationData, { headers: { token } });
              if (data.success) {
                setCartItems({});
                navigate('/orders');
                toast.success('Order Is Placed')
              } else {
                toast.error(data.message);
              }
            } catch (error) {
              console.log(error);
              toast.error(error.message)
            }
          }
        }
        const rzp = new window.Razorpay(options);
        rzp.open()
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + parseInt(delivery_fee),
      }
      switch (method) {
        case 'cod':
          console.log(token, BackendURL + '/api/order/place', orderData, { headers: { token } });
          const response = await axios.post(BackendURL + '/api/order/place', orderData, { headers: { token } });
          if (response.data.success) {
            setCartItems({});
            toast.success(response.data.message)
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'stripe':
          const stripe = await axios.post(BackendURL + '/api/order/stripe', orderData, { headers: { token } });
          if (stripe.data.success) {
            const session_url = stripe.data.url;
            window.location.replace(session_url);
          }
          else {
            toast.error(stripe.data.message)
          }
          break;


        case 'razorpay':
          const razorpay = await axios.post(BackendURL + '/api/order/razorpay', orderData, { headers: { token } });
          if (razorpay.data.success) {
            initPay(razorpay.data.order);
          } else {
            toast.error(razorpay.data.message);
          }
          break;

        default:
          toast.error("Select a payment Method");
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col mt-1 py-5 sm:flex-row gap-1 sm:gap-19 pt-10 border-t border-gray-400 '>
      <div className='flex flex-col gap-4 w-[70%] max-h-[700px] overflow-y-auto' >
        <div className='text-xl sm:text-2xl my-3'>
          <Title mainTitle={"Delivery"} SubHeading={"Information"} />
        </div>
        <div className='flex gap-3'>
          <input type="text" name="firstName" value={formData.firstName} onChange={(e) => onchangeHandler(e)} required placeholder='First Name ' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px]' />
          <input type="text" name="lastName" value={formData.lastName} onChange={(e) => onchangeHandler(e)} required placeholder='Last Name' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px]' />
        </div>

        <div className='flex gap-3'>
          <input type="email" name="email" value={formData.email} onChange={(e) => onchangeHandler(e)} required placeholder='Email Address' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
          <input type="tel" name="phone" value={formData.phone} onChange={(e) => onchangeHandler(e)} required placeholder='10-Digit Mobile number' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
        </div>

        <div className='flex gap-3'>
          <input type="text" name="zipcode" value={formData.zipcode} onChange={(e) => onchangeHandler(e)} required placeholder='Zip code' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
          <input type="text" name="locality" value={formData.locality} onChange={(e) => onchangeHandler(e)} required placeholder='Locality' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
        </div>


        <div className='flex gap-3'>
          <textarea type="text" name='address' value={formData.address} onChange={(e) => onchangeHandler(e)} required placeholder='Address (Area and street)' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full h-10 outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
          <input type="text" name="country" value={formData.country} onChange={(e) => onchangeHandler(e)} required placeholder='Country' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
        </div>

        <div className='flex gap-3'>
          <input type="text" name="city" value={formData.city} onChange={(e) => onchangeHandler(e)} required placeholder='City/District/Town' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
          <input type="text" name="state" value={formData.state} onChange={(e) => onchangeHandler(e)} required placeholder='State' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
        </div>

        <div className='flex gap-3'>
          <input type="text" name="landmark" value={formData.landmark} onChange={(e) => onchangeHandler(e)} placeholder='Landmark(Optional)' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
          <input type="tel" name="alternatephone" value={formData.alternatephone} onChange={(e) => onchangeHandler(e)} placeholder='Alternate Phone(Optional)' className='border border-gray-300 rounded py-2 px-3 text-sm sm:text-base w-full outline-0 transition-all ease-in-out duration-300 active:border-blue-400 active:border-2 focus:border-blue-500 focus:border-[1.8px] placeholder:text-xs sm:placeholder:text-sm' />
        </div>


      </div>

      <div className='w-full lg:w-1/3 flex flex-col gap-6 mt-10'>
        <div className='h-[200px] flex flex-col justify-start items-start bg-white p-4 rounded-xl border border-blue-200 shadow-sm'>
          <p className='text-lg font-semibold text-blue-700 mb-2'>Price Details</p>
          <CartTotal />
        </div>
        <div>
          <Title mainTitle={"Complete"} SubHeading={"Payment"} />
        </div>
        <div className='grid gap-3 grid-cols-2 lg:grid-cols-1 w-full mt-4'>
          <div onClick={() => setMethod("stripe")} className={`flex items-center gap-3 border p-2 px-3 rounded-xl cursor-pointer w-full hover:border-[1.5px] border-blue-400 transition-all ease-in-out duration-500 ${method === "stripe" ? "border-gray-500" : "border-gray-300"}`}>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "border-gray-500 bg-orange-400" : "border-gray-300"}`}></p>
            <p>stripe</p>
            <img src={Assets.stripe} alt="stripe payment gateway" className='h-5 mx-4 ml-auto' />
          </div>

          <div onClick={() => setMethod("razorpay")} className={`flex items-center gap-3 border p-2 px-3 rounded-xl cursor-pointer w-full hover:border-[1.5px] border-blue-400 transition-all ease-in-out duration-500 ${method === "razorpay" ? "border-gray-500" : "border-gray-300"}`}>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "border-gray-300 bg-orange-400" : "border-gray-400"}`}></p>
            <p>Razorpay</p>
            <img src={Assets.razorpay} alt="Razorpay payment gateway" className='h-5 mx-4 ml-auto' />
          </div>
          <div onClick={() => setMethod("cod")} className={`flex items-center gap-3 border p-2 px-3 rounded-xl cursor-pointer w-full hover:border-[1.5px] border-blue-400 transition-all ease-in-out duration-500 ${method === "cod" ? "border-gray-500" : "border-gray-300"}`}>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "border-gray-300 bg-orange-400" : "border-gray-400"}`}></p>
            <p className='text-gary-600 text-sm font-medium mx-4 '>Cash On Delivery</p>
          </div>
        </div>
        <div className='w-full text-end mt-8'>
          <button className="cursor-pointer bg-blue-400 text-white font-semibold px-16 py-3 w-full rounded-xl text-sm">Pay On {method === "stripe" ? "Stripe" : method === "razorpay" ? "Razorpay" : "Cash On Delivery"}</button>
        </div>
      </div>
    </form>

  )
}

export default PlaceOrder
