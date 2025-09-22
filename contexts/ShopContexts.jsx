import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 25;
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

const addToCart = async (itemId, size, quantity = 1) => {
        if (!size) {
            toast.error('Select the Product Size!!');
            return;
        }

        setCartItems(prevCartItems => {
            const newCartItems = structuredClone(prevCartItems);
            if (newCartItems[itemId]) {
                if (newCartItems[itemId][size]) {
                    newCartItems[itemId][size] += quantity; 
                } else {
                    newCartItems[itemId][size] = quantity;
                }
            } else {
                newCartItems[itemId] = { [size]: quantity }; 
            }
            return newCartItems;
        });

        if (token) {
            try {
                
                const response = await axios.post(BackendURL + "/api/cart/add", { itemId, size, quantity }, { headers: { token } });
                if (response.data.success) {
                    toast.success(response.data.message)
                } else {
                    toast.error(response.data.error);
                }
            } catch (error) {
                console.log("Error created in addToCart _ShopContext", error);
                toast.error(error.message);
            }
        } else {
            toast.error('Login to add products to cart!');
        }
    }
    
  
    const buyNow = (itemId, size, quantity) => {
        if (!size) {
            toast.error('Select the Product Size!!');
            return false; 
        }
       
        const newCart = {
            [itemId]: {
                [size]: quantity
            }
        };
        setCartItems(newCart);
        return true; 
    };
    // const addToCart = async (itemId, size) => {
    //     if (!size) {
    //         toast.error('Select the Product Size!!');
    //         return;
    //     }
    //     let cartData = structuredClone(cartItems);
    //     if (cartData[itemId]) {
    //         if (cartData[itemId][size]) {
    //             cartData[itemId][size] += 1;

    //         } else {
    //             cartData[itemId][size] = 1;
    //         }
    //     }
    //     else {
    //         cartData[itemId] = {};
    //         cartData[itemId][size] = 1;
    //     }
    //     setCartItems(cartData);

    //     if (token) {
    //         try {
    //             const response = await axios.post(BackendURL + "/api/cart/add", { itemId, size }, { headers: { token } });
    //             if (response.data.success) {
    //                 toast.success(response.data.message)
    //             } else {
    //                 toast.error(response.data.error);
    //             }
    //         } catch (error) {
    //             console.log("Error created in addToCart _ShopContext", error);
    //             toast.error(error.message);
    //         }
    //     } else {
    //         toast.error('Login to add products to cart!');
    //     }
    // }

    const getCartdata = async () => {
        if (!token) return;
        try {
            const response = await axios.post(BackendURL + "/api/cart/get",{}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error getting in Cart:", error)
            toast.error(error.message);
        }

    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        if (token) {
            try {
                await axios.post(BackendURL + "/api/cart/update", { itemId, size, quantity }, { headers: { token } });
                getCartdata(localStorage.getItem('token'));
            } catch (error) {
                console.log("Error getting in CartUpdate:", error)
                toast.error(error.message);
            }
        }
        else {
            toast.error("please Login to Add items to the Cart")
        }
    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    console.log(error)

                }
            }
        }
        return totalCount;
    }

   const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        totalAmount += itemInfo.price * cartItems[itemId][size];
                    }
                }
            }
        }
        return totalAmount;
    };


    const getProductsData = async () => {
        try {
            const response = await axios.get(BackendURL + "/api/Product/list");
            if (response.data.success) {
                setProducts(response.data.list);
            }
            else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error created in Product list _ShopContext", error);
            toast.error(error.message);
        }
    }

    //  useEffect(() => {
    //     const loadInitialData = async () => {
    //         await getProductsData();
    //         const storedToken = localStorage.getItem("token");
    //         if (storedToken) {
    //             setToken(storedToken);
    //         }
    //     };
    //     loadInitialData();
    // }, []); 

    // useEffect(() => {
    //     if (token) {
    //         getCartdata();
    //     }
    // }, [token]);

    
    useEffect(() => {
        getProductsData();
        if (!token && localStorage.getItem("token"))
            setToken(localStorage.getItem('token'));
    }, []);

    useEffect(()=>{
        if(token){
            getCartdata()
        }
    },[token])


    const value = {
        currency, delivery_fee, BackendURL, cartItems, setCartItems, products, setProducts,
        token, setToken, navigate, addToCart, getCartdata, getCartAmount, getCartCount, updateQuantity,
        buyNow
    };
    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider >

    )
}

export default ShopContextProvider; 
