import React, { useState } from 'react'
import logo from "../images/LogoIcon.jpeg"
import burgerImg from "../images/burger.jpg"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';
import { Back } from '#src/components/Back.jsx';
import api from '../config/axios.js'
import { Loading } from '../components/ui/Loading';

export const Login = () => {
    const navigate = useNavigate();
    const { login , user ,cafe} = useAuth();
    const [error , setError ] = useState({});
    // const [cafe , setCafe ] = useState({});

    const [formData, setFormData] = useState({
            email : "" ,
            password : "" ,
    });

    const handleChange= (e)=>{
        setFormData({ ...formData , [e.target.name]:e.target.value})
        setError({ ...error, [e.target.name]: '' });
    }

    const validate = () =>{
        
        let newErrors = {};
        // else if(!name) newErrors.email = "enter valid name"
        
        if(!formData.email) newErrors.email = "Email is required" 
        else if(!(formData.email.includes("@") && formData.email.includes("."))) newErrors.email = "enter valid email"

        if(!formData.password) newErrors.password = "Password is required"
        else if(formData.password.length < 6) newErrors.password = "minimum 6 characters required"

        return newErrors;

    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setError(newErrors);
            return;
        }

        // try{
            // const data = new FormData();
            // data.append('name', formData.name);
            // data.append('email', formData.email);
            // data.append("password" , formData.password);
            // console.log(formData);
            // const res =await axios.post('/api/auth/register', data);
            const res = await toast.promise(api.post('/api/auth/login', {
                email: formData.email,
                password: formData.password,
            }), {
                pending: ' Logginng you in...',
                success: '✅ Logged In successfully!',
                error: {
                    render({ data }) {
                        console.log(data?.response?.data?.err );
                        // shows actual error from backend
                        return data?.response?.data?.error?.[0] 
                            || data?.response?.data?.err
                            || 'Something went wrong';
                    }
                }
            });
            login(res?.data?.token ,res?.data?.user);
            
            res?.data?.role === "Student" && navigate("/");
            res?.data?.role === "Teacher" && navigate("/");

            if(res?.data?.role === "Cafe Owner") {                
                const cafeRes = await api.get(`/api/cafe/owner`, { // fetch cafe right after login
                    headers: { Authorization: `Bearer ${res.data.token}` }
                    });
                console.log(cafeRes.data);

                cafeRes?.data.data.length > 0
                ? navigate(`/cafe/${res?.data?.user?._id}`)
                : navigate("/cafe/register");
            }
    }

  return (
    <div className='flex flex-col md:flex-row overflow-y-scroll'>
        <div className='bg-[#feefe3] flex flex-col gap-4 
                items-center 
                py-10 
                w-full md:w-1/2 lg:h-screen'>
            <img src={logo} className='rounded-full object-cover cursor-pointer h-30 '></img>
            <h1 className='text-4xl font-bold'>Camfè</h1>
            <div className='flex flex-col items-center'>
                <p className='opacity-75'>Delicious food from your favorite campus cafes,</p>
                <p className='opacity-75'> delivered straight to your location</p>
            </div>
            <img src={burgerImg} className='rounded-xl shadow-2xl object-cover cursor-pointer h-50 w-90'></img>
            <Back/>

        </div>
        <div className='w-full md:w-1/2 flex flex-col gap-4 
                justify-center 
                p-4 md:px-10 md:pt-4'>
            <p className='text-4xl '>Welcome Back!</p>
            <p className='opacity-75'>Sign in to order from your favorite campus cafes</p>
            {/* <button className='bg-[#faf8f3] rounded cursor-pointer border-gray-300 border-opacity-50 text-black px-4 py-2 border'>Continue with Google</button> */}
            {/* <div className='flex items-center gap-3 w-full'>
                <hr className='flex-1 border-gray-300' />
                <p className='text-gray-500 text-sm whitespace-nowrap'>Or continue with email</p>
                <hr className='flex-1 border-gray-300' />
            </div> */}
            <Button
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3"
            >
                <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                Continue with Google
            </Button>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <label htmlFor="email">University Email</label>
                <input placeholder='your.email@nsut.ac.in' name="email" type='text'
                value={formData.email}
                onChange={handleChange}
                className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.email && <p className='text-red-500 text-xs'>{error.email}</p>}


                <label htmlFor="password">Password</label>
                <input placeholder='Enter Your Password' name="password" type='password'
                value={formData.password}
                onChange={handleChange}
                className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.password && <p className='text-red-500 text-xs'>{error.password}</p>}

                <button className='bg-[#fe6a36] text-white py-3 px-4 cursor-pointer'>Sign In</button>
            </form>
            <a onClick={() => navigate("/register")} 
            className='cursor-pointer'
            >Don't have an Account ? Register Now!</a>
            <p className='opacity-75 text-xs flex justify-center'>By continuing, you agree to our Terms of Service and Privacy Policy</p>

        </div>
    </div>
  )
}
