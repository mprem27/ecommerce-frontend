import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const Verify = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get("success");
        const orderId = urlParams.get("orderId");
        const session_id = urlParams.get("session_id");

        const response = await axios.post(`${backendUrl}/api/order/verifyStripe`, {
          success,
          orderId,
          session_id
        }, {
          headers: { token: localStorage.getItem("token") }
        });

        if (response.data.success) {
          toast.success("Payment Successful!");
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Payment Failed!");
          navigate("/");
        }
      } catch (error) {
        console.error("Verify error:", error);
        toast.error("Verification failed");
        navigate("/");
      }
    };

    verifyPayment();
  }, [navigate]);

  return (
    <div className="verify-page flex items-center justify-center h-screen">
      <h2 className="text-xl text-gray-700 font-semibold">Verifying your payment...</h2>
    </div>
  );
};

export default Verify;
