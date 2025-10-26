<<<<<<< HEAD
=======
// import React, { useEffect } from "react";
// import { useContext } from "react";
// import { ShopContext } from "../../contexts/ShopContexts";
// import { useSearchParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Verify = () => {
//   const { navigate, token, setCartItems, BackendURL } = useContext(ShopContext);
//   const [searchParams] = useSearchParams();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const success = searchParams.get("success");
//         const orderId = searchParams.get("orderId");
//         const session_id = searchParams.get("session_id");

//         // ✅ Using the correct BackendURL from context
//         const response = await axios.post(
//           `${BackendURL}/api/order/verifyStripe`,
//           { success, orderId, session_id },
//           {
//             headers: { token: token || localStorage.getItem("token") },
//           }
//         );

//         if (response.data.success) {
//           toast.success("Payment Successful!");
//           setCartItems([]); // optional clear cart
//           navigate("/orders");
//         } else {
//           toast.error(response.data.message || "Payment Failed!");
//           navigate("/");
//         }
//       } catch (error) {
//         console.error("Verify error:", error);
//         toast.error("Verification failed!");
//         navigate("/");
//       }
//     };

//     verifyPayment();
//   }, [navigate, searchParams, BackendURL, token, setCartItems]);

//   return (
//     <div className="verify-page flex items-center justify-center h-screen">
//       <h2 className="text-xl text-gray-700 font-semibold">
//         Verifying your payment...
//       </h2>
//     </div>
//   );
// };

// export default Verify;



// // import React, { useEffect } from 'react'
// // import { useContext } from 'react'
// // import { ShopContext } from '../../contexts/ShopContexts'
// // import { useSearchParams } from 'react-router-dom'
// // import axios from 'axios'
// // import { toast } from 'react-toastify'

// // const Verify = () => {
// //     const {navigate,token,setCartItems,BackendURL} = useContext(ShopContext)
// //     const [searchParams,setSearchParams] = useSearchParams();
// //     const success = searchParams.get('success');
// //     const orderId = searchParams.get('orderId');

// //     const verifyPayment = async ()=>{
// //         try {
// //             if(!token){
// //                 return null;

// //             }
// //             const response = await axios.post(BackendURL+'/api/order/verifyStripe',{ success, orderId},{headers:{token}});
// //             if(response.data.success){
// //                 toast.success(response.data.message);
// //                 setCartItems({});
// //                 navigate('/orders');
// //             }else{
// //                 toast.error(response.data.message);
// //                 navigate('/cart');
// //             }
// //         } catch (error) {
// //             console.log(error);
// //             toast.error(error.message)
// //         }
// //     }
// //     useEffect(()=>{
// //         verifyPayment()
// //     },[token])
// //   return (
// //     <div></div>
// //   )
// // }

// // export default Verify
>>>>>>> 4215588 (first commit)
import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../../contexts/ShopContexts";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems, BackendURL } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const success = searchParams.get("success");
        const orderId = searchParams.get("orderId");
        const session_id = searchParams.get("session_id");

        // ✅ Using the correct BackendURL from context
        const response = await axios.post(
          `${BackendURL}/api/order/verifyStripe`,
          { success, orderId, session_id },
          {
            headers: { token: token || localStorage.getItem("token") },
          }
        );

        if (response.data.success) {
          toast.success("Payment Successful!");
          setCartItems([]); // optional clear cart
          navigate("/orders");
        } else {
          toast.error(response.data.message || "Payment Failed!");
          navigate("/");
        }
      } catch (error) {
        console.error("Verify error:", error);
        toast.error("Verification failed!");
        navigate("/");
      }
    };

    verifyPayment();
  }, [navigate, searchParams, BackendURL, token, setCartItems]);

  return (
    <div className="verify-page flex items-center justify-center h-screen">
      <h2 className="text-xl text-gray-700 font-semibold">
        Verifying your payment...
      </h2>
    </div>
  );
};

export default Verify;