import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../../contexts/ShopContexts';
import { Assets } from '../assets/Assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { products, currency, BackendURL, token, navigate } = useContext(ShopContext);
  const [userOrders, setUserOrders] = useState([]);

  const fetchUserOrders = async () => {
    try {
      const response = await axios.post(
        BackendURL + "/api/order/userOrders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setUserOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching user orders:", error);
      toast.error("Could not load order history.");
    }
  };

  const cancelOrder = async (orderId, status) => {
    if (status === 'in transit' || status === 'delivered') {
      toast.info("Cancellation not available after shipment.");
      return;
    }

    if (!window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) return;

    try {
      const response = await axios.post(
        BackendURL + "/api/order/updateOrder",
        { orderId, status: 'cancelled' },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order has been cancelled.");
        fetchUserOrders();
      } else {
        toast.error("Failed to cancel order.");
      }
    } catch (error) {
      toast.error("An error occurred during cancellation.");
    }
  };

  const deleteOrder = async (orderId) => {
  if (!window.confirm("Are you sure you want to permanently delete this order?")) return;

  try {
    const response = await axios.post(BackendURL + "/api/order/removeOrder", { orderId },{ headers: { token } });

    if (response.data.success) {
      toast.success("Order deleted successfully.");
      setUserOrders((prevOrders) => prevOrders.filter((e) => e._id !== orderId));
    } else {
      toast.error("Failed to delete order.");
    }
  } catch (error) {
    console.log("Error deleting order:", error);
    toast.error("An error occurred while deleting the order.");
  }
};

  const StatusBadge = ({ status }) => {
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    let classes = 'px-3 py-1 rounded-full text-xs font-semibold';

    switch (status.toLowerCase()) {
      case 'pending': classes += ' bg-yellow-100 text-yellow-800'; break;
      case 'processing': classes += ' bg-blue-100 text-blue-800'; break;
      case 'in transit': classes += ' bg-indigo-100 text-indigo-800'; break;
      case 'delivered': classes += ' bg-green-100 text-green-800'; break;
      case 'cancelled': classes += ' bg-red-100 text-red-800'; break;
      default: classes += ' bg-gray-100 text-gray-800'; break;
    }
    return <span className={classes}>{label}</span>;
  };

  useEffect(() => {
    if (token) fetchUserOrders();
  }, [token]);

  return (
    <div className='w-full mx-auto mt-5 px-4'>
      <div className='py-5 mb-5'>
        <h2 className='text-3xl font-bold text-center text-gray-900'>Your Order History</h2>
      </div>

      <div>
        {userOrders.length > 0 ? (
          <div className='flex flex-col gap-8'>
            {userOrders.map((order, orderIndex) => (
              <div key={orderIndex} className='w-full shadow-2xl rounded-xl border border-gray-200 bg-white p-4 sm:p-6 relative'>

                <div className='absolute top-4 right-4'>
                  <StatusBadge status={order.status || 'pending'} />
                </div>

                <div className='flex flex-col gap-4'>
                  {order.items && order.items.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    if (!productData) return null;

                    return (
                      <div key={index} className='flex flex-row items-start gap-4 w-full border border-gray-200 bg-gray-50 p-3 rounded-lg'>
                        <img
                          src={productData.image?.[0] || Assets.placeholder}
                          alt={productData.name}
                          className='w-28 h-28 object-cover rounded-lg'
                        />

                        <div className='flex flex-col flex-grow gap-1'>
                          <p className='font-semibold text-lg text-gray-900 line-clamp-1'>{productData.name}</p>
                          <p className='line-clamp-2 text-gray-800 text-sm'>{productData.description}</p>

                          <div className='flex justify-between items-end mt-2'>
                            <p className='text-sm text-gray-900'>
                              Qty: <span className='font-medium'>{item.quantity}</span> | 
                              Size: <span className='font-medium'>{item.size}</span>
                            </p>

                            <p className='font-bold text-lg text-gray-900'>
                              {currency}{(productData.price * item.quantity).toFixed(2)}
                            </p>
                          </div>

                          <div className='text-sm text-gray-900 mt-2'>
                            <p>Order ID: <span className='font-semibold'>{order._id.slice(0, 10)}...</span></p>
                            <p>Delivery expected by: <span className='font-semibold'>{new Date(order.date || order.createdAt).toLocaleDateString()}</span></p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Grand Total, Cancel & Delete Buttons */}
                <div className='flex justify-between items-center pt-4 mt-4 border-t border-gray-100'>
                  <p className='text-lg font-bold text-gray-900'>Grand Total: {currency}{order.amount.toFixed(2)}</p>
                  <div className='flex gap-3'>
                    <button
                      onClick={() => cancelOrder(order._id, order.status)}
                      className='font-medium text-gray-800 border px-6 py-2 border-gray-400 rounded-md hover:bg-blue-400 border-blue-800 transition-all ease-in-out duration-500'
                    >
                      Cancel Order
                    </button>
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className='font-medium text-gray-800 border px-6 py-2 border-gray-400 rounded-md hover:bg-red-500 hover:text-white border-blue-800 transition-all ease-in-out duration-500'
                    >
                      Delete Order
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center p-10'>
            <img src={Assets.emptycart} alt="no orders" className='w-60 h-60 object-contain mb-5' />
            <p className='text-xl text-gray-700 font-semibold py-2'>You haven't placed any orders yet</p>
            <button onClick={() => navigate('/')} className='bg-orange-400 text-white text-lg my-4 px-8 py-3 cursor-pointer rounded-md'>Start Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
