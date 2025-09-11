import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    const BackendURL = import.meta.env.VITE_BACKEND_URL;
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();



    const addToCart = async (itemId,size) =>{
        if(!size){
            toast.error('Select the Product Size!!');
            return;
        }
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;

            }else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    
    if(token){
        try {
            const response = await axios.post(BackendURL+"/api/cart/add",{itemId,size}, {headers:{token}});
            if(response.data.success){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.error);
            }
        } catch (error) {
            console.log("Error created in addToCart _ShopContext",error);
            toast.error(error.message);
        }
    }else{
        toast.error('Login to add products to cart!');
    }
}


    const getProductsData = async () =>{
        try {
            const response = await axios.get(BackendURL+"/api/Product/list");
            if(response.data.success){
                setProducts(response.data.list);
            }
            else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Error created in Product list _ShopContext",error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getProductsData(); 
        if(!token && localStorage.getItem("token"))
        setToken(localStorage.getItem('token'));
    },[]);

    const value = {
        currency, delivery_fee, BackendURL, cartItems, setCartItems, products, setProducts,
        token, setToken, navigate,addToCart
    };
    return (
        <ShopContext.Provider value={value} >
            {props.children}
        </ShopContext.Provider >

    )
}

export default ShopContextProvider; 
