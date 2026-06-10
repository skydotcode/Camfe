import React, { useState } from 'react'
import logo from "../images/LogoIcon.jpeg"
import burgerImg from "../images/burger.jpg"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { Back } from '#src/components/Back.jsx';
import { Button } from '@mui/material';

const roles = [
  { id: 1, name: 'Student' },
  { id: 2, name: 'Teacher' },
  { id: 3, name: 'Cafe Owner' },
//   { id: 4, name: 'NSUT Safal' },
];

export const Register = () => {
    const { login , } = useAuth();
    const navigate = useNavigate();
    const [role , setRole] = useState('');
    const [error , setError ] = useState({});

    const [formData, setFormData] = useState({
            name : "" , 
            email : "" ,
            password : "" ,
        });

    const handleChange= (e)=>{
        setFormData({ ...formData , [e.target.name]:e.target.value})
        setError({ ...error, [e.target.name]: '' });
    }
    const handleCafeChange=(e)=>{
        const role = e.target.value ;
        setRole(role);
    }

    const validate = () =>{
        
        let newErrors = {};
        if(!formData.name) newErrors.name = "name is required" 
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
        const res = await toast.promise(axios.post('/api/auth/register', {
            name: formData.name,
            role: role,
            email: formData.email,
            password: formData.password,
        }) , {
        pending: ' Checking you in...',
        success: '✅ Registration successfully!',
        error: {
            render({ data }) {
                console.log(data?.response?.data?.err);

                // shows actual error from backend
                return data?.response?.data?.error?.[0] 
                    || data?.response?.data?.err
                    || 'Something went wrong?';
            }
        }
        });
        login(res.data.token ,res.data.user);
        // toast.success(res.data.message);
        console.log(res.data.role);
        res.data.role === "Student" && navigate("/");
        res.data.role === "Teacher" && navigate("/"); 
        res.data.role === "Cafe Owner" && navigate("/cafe/register");   

    }

    return (
    <div className='flex flex-col md:flex-row overflow-y-scroll'>
        <div className='bg-[#feefe3] flex flex-col gap-4 
                items-center 
                py-10 
                w-full md:w-1/2 lg:h-screen'>
            <img src={logo} className='rounded-full object-cover cursor-pointer h-30 '></img>
            <h1 className='text-4xl font-bold'>Camfè </h1>
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
            <p className='text-4xl '>Welcome!</p>
            <p className='opacity-75'>Register Now to order from your favorite campus cafes</p>
            <Button
                size="lg"
                variant="outlined"
                color="blue-gray"
                className="flex items-center gap-3"
            >
                <img src="https://docs.material-tailwind.com/icons/google.svg" alt="metamask" className="h-6 w-6" />
                Continue with Google
            </Button>
            <div className='flex items-center gap-3 w-full'>
                <hr className='flex-1 border-gray-300' />
                <p className='text-gray-500 text-sm whitespace-nowrap'>
                    Or continue with email</p>
                <hr className='flex-1 border-gray-300' />
            </div>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <label htmlFor="name">Your Good Name</label>
                <input placeholder='Enter Your Name'  name="name" 
                value={formData.name} 
                onChange={handleChange} type='text'
                className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.name && <p className='text-red-500 text-xs'>{error.name}</p>}

                <div className="relative w-64 py-2 ">
                    <select
                        value={role}
                        onChange={handleCafeChange}
                        className="
                        w-full
                        px-4 py-2
                        bg-white
                        border-2 border-[#fe6a36]
                        rounded-lg
                        text-gray-700
                        font-medium
                        cursor-pointer
                        outline-none
                        appearance-none
                        focus:border-orange-600
                        focus:ring-2 focus:ring-orange-300
                        transition-all duration-200
                        
                        "
                    >
                        <option value="" disabled>Select who you are</option>
                        {roles.map(role => (
                        <option key={role.id} value={role.name}>
                            {role.name}
                        </option>
                        ))}
                        {/* <option value="" >Student Center</option>
                        <option  >Safal</option>
                        <option  >NesCafe</option>
                        <option  >Mother Dairy</option> */}
                    </select>

                {/* custom dropdown arrow */}
                    <div className="absolute right-3 top-3 pointer-events-none text-orange-500">
                        ▼
                    </div>
                    
                </div>{error.cafe && <p style={{ color: 'red' }}>{error.cafe}</p>}


                <label htmlFor="email">University Email</label>
                <input placeholder='your.email@nsut.ac.in'  name="email" 
                value={formData.email}
                onChange={handleChange} type='text'
                className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.email && <p className='text-red-500 text-xs'>{error.email}</p>}

                <label htmlFor="password">Password</label>
                <input placeholder='Enter a Strong Password'  name="password" type='password' 
                value={formData.password}
                onChange={handleChange}
                className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.password && <p className='text-red-500 text-xs'>{error.password}</p>}

                <button className='bg-[#fe6a36] text-white py-3 px-4 cursor-pointer'>Register</button>
            </form>
            <a onClick={() => navigate("/login")} 
            className='cursor-pointer'
            >Already have an Account ? Login Now!</a>
            <p className='opacity-75 text-xs flex justify-center'>By continuing, you agree to our Terms of Service and Privacy Policy</p>
        </div>
    </div>
    )
}
