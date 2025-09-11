import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../contexts/ShopContexts'
import { Assets } from '../assets/Assets';
import { toast } from 'react-toastify';
import axios from 'axios'

const Login = () => {
    const { token, setToken, navigate, BackendURL } = useContext(ShopContext);
    const [currentstate, setCurrentState] = useState('Login');
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');


    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            if (currentstate === "Login") {

                const response = await axios.post(BackendURL + "/api/user/login", { email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success("Successfully Logged In!");
                    navigate("/");

                }
                else {
                    toast.error("Error in While Logging in" + response.data.message);
                }
            }
            else {
                const response = await axios.post(BackendURL + "/api/user/register", { name, phonenumber, email, password });
                if (response.data.success) {
                    setToken(response.data.token);
                    localStorage.setItem("token", response.data.token);
                    toast.success("Successfully Created Account! Please Login");
                    navigate("/");

                }
                else {
                    toast.error("Error in While Logging in" + response.data.message);
                }
            }
        } catch (error) {
            console.log("Error in Login :", error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, [token]);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/")
        }
    }, []);

    return (
        <div className='flex flex-col items-center justify-center w-full -mt-10  '>
            <span className='items-center justify-center text-[#121238]'><img src={Assets.Logoheader} alt="logoheader" className='h-15 w-auto translate-y-2 object-contain mb-1 scale-150' /></span>

            <form onSubmit={(e) => onSubmitHandler(e)} className='flex flex-col items-center w-[90%] sm: max-w-sm m-auto  gap-4 text-gray-700 shadow-md rounded-2xl px-8 py-4 bg-[#bae6fd]'>
                <div className='inline-flex items-center gap-2 mb-2 mt-10'>
                    <p className='text-3xl text-[#1e1c2ae5]'>{currentstate === "Login" ? "Login" : "Create Account"}</p>
                    {/* <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' /> */}
                </div>
                {currentstate === "Login" ? "" : (
                    <div className='flex flex-col items-start w-full'>
                        <label className='text-sm font-medium text-[#1e1c2ae5] mb-1'>Name</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='rounded-lg w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='First and last name' required />
                    </div>
                )}
                {currentstate === "SignUp" && (<div className='flex flex-col items-start w-full'>
                    <label className='text-sm font-medium text-[#1e1c2ae5] mb-1'>Phone Number</label>
                    <input type="tel" onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))} value={phonenumber} className='rounded-lg w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='Mobile number' required />
                </div>
                )}
                <div className='flex flex-col items-start w-full'>
                    <label className='text-sm font-medium text-[#1e1c2ae5]  mb-1'>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='rounded-lg w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='your@email.com' required />
                    </div>
                    <div className='flex flex-col items-start w-full'>  
                    <label className='text-sm font-medium text-[#1e1c2ae5]  mb-1'>{currentstate === "Login" ? "Password" : "Password (at least 8 characters)"}</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='rounded-lg w-full px-3 py-2 border border-[#1e1c2ae5] outline-none' placeholder='Enter your Password' required />
                </div>



                <div className='w-full flex justify-between text-sm mt-[-8px]'>
                    <p className='cursor-pointer text-[#161320] hover:text-gray-500 '>{currentstate === "Login" ? "Forgot Password" : ""}</p>



                </div>
                <button type="submit" className='cursor-pointer mt-2 w-full px-4 py-2 rounded-4xl text-white bg-[#292639] hover:bg-[#373544]'>{currentstate === "Login" ? "Login" : "Proceed to Create Account"}</button>
                <div className='flex flex-col mt-5 w-full '>
                    <hr className=" border-gray-400 " />
                    <p className='mt-2 font-medium text-md text-[#1e1c2ae5]'>{currentstate === "Login" ? "Don’t have an account?" : "Already a customer?"}</p>
                    {
                        currentstate == "Login" ?
                            <p className='cursor-pointer text-blue-500 hover:underline' onClick={() => setCurrentState("SignUp")}>Create Account</p>
                            :
                            <p className='cursor-pointer text-blue-500 hover:underline' onClick={() => setCurrentState("Login")}>Login in instead</p>
                    }
                </div>
            </form>
            <div className='mt-15 w-full '>
                <hr className='text-gray-400' />
                <p className='py-5 text-sm text-gray-500 text-center'>© 2025, GoBok.com. The future of shopping.</p>
            </div>
        </div>

    )
}

export default Login;