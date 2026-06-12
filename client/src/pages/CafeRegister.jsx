import React, { useState } from 'react'
import logo from "../images/LogoIcon.jpeg"
import burgerImg from "../images/burger.jpg"
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Navbar} from "../components/Navbar"
import { useAuth } from '#src/context/AuthContext.jsx';
import { Footer } from '#src/components/Footer.jsx';


export const CafeRegister = () => {
    const {login , user , isLoggedIn , cafe} = useAuth();
    const navigate = useNavigate();
    // const [cafe , setCafe] = useState('');
    const [image , setImage] = useState(null);
    const [preview , setPreview] = useState(null);
    const [error , setError ] = useState({});
    const [formData, setFormData] = useState({
            phone : "" , 
            cafe : "" ,
        });
    console.log("cafe",cafe);
    const handleChange =(e)=>{ 
        setFormData({ ...formData , [e.target.name] : e.target.value})
        setError({ ...error, [e.target.name]: '' });
    }


    const handleImageChange =(e)=>{
        const file = e.target.files[0];
        console.log(file);

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError({ ...error, image: 'Only JPG, PNG or WEBP images allowed' });
            return;
        }
        setImage(file);
        setError({...error , image:''});
        setPreview(URL.createObjectURL(file));
    }

    const validate = () =>{
        
        let newErrors = {};
        if(!formData.phone.trim()) newErrors.phone = "phone number is required" 
        else if(formData.phone.length != 10) newErrors.email = "enter valid phone number "
        // if(!cafe.trim()) newErrors.cafe = " Please Select Your Cafe" 
        
        if(!formData?.cafe?.trim()) newErrors.cafe = "cafe is required" 
        // else if(!( formData.cafe.includes("."))) newErrors.cafe = "Enter valid cafe Name"

        // if(!formData.password.trim()) newErrors.password = "Password is required"
        // else if(formData.password.length < 6) newErrors.password = "minimum 6 characters required"

        if(!image) newErrors.image = "Image is required"

        return newErrors;

    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setError(newErrors);
            return;
        }
        try{
            // if(!login) navigate("/login");
            const data = new FormData();
            data.append('phone', formData.phone);
            data.append('cafe', formData.cafe);
            data.append("image" , image);
            data.append("upload_preset" , upload_preset);
            // data.append('email', formData.email);
            // data.append('password', formData.password);
            // // data.append('description', formData.description);
            // // data.append('category', formData.category);
            // console.log(image);
            // data.append("image" , image);
            // console.log("done");
            // data.append("upload_preset" , upload_preset);
            console.log(data.get('phone'));
            const token = localStorage.getItem('token');
            let res = await toast.promise(axios.post('/api/cafe/register', data,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }), {
                pending: ' Validating you in...',
                success: '✅ Cafe Created Successfully!',
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
            navigate(`/cafe/${res?.data?.newCafe?._id}`);
            // console.log(res);  

        }catch(e){
            console.log("errror",e);
            const message = e.response?.data?.error ;
            toast.error(message);
        }

    }

    return (
    <div> {isLoggedIn ? (
    <div className='flex flex-col  overflow-y-scroll' id='cafeRegister' >
        <Navbar/>
    
        <div className='w-full md:w-1/2 flex flex-col gap-4 px-4
                justify-center min-h-screen items-center justify-center
                p-4 md:px-10 md:pt-4 px-4'>
            <p className='text-4xl '>Welcome! {user?.name}</p>
            <p className='opacity-75'>Register Now to get order from all over the campus </p>
            
            <form className='flex flex-col  px-4' onSubmit={handleSubmit}>
                

                <label htmlFor="cafe" className='mx-2'>Your Cafe Name:</label>
                <input placeholder='Enter Your Cafe Name'  name="cafe" 
                value={formData.cafe} 
                onChange={handleChange} type='text'
                className='px-4 py-2 mb-2  focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.cafe && <p className='text-red-500 text-xs'>{error.cafe}</p>}

                <label htmlFor="phone" className='mx-2'>Cafe Phone Number:</label>
                <input placeholder='Enter Your Cafe Phone Number'  name="phone" 
                value={formData.phone} 
                onChange={handleChange} type='number'
                className='px-4  py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                {error.phone && <p className='text-red-500 text-xs'>{error.phone}</p>}

                <label htmlFor="image" name='image' className='m-2 cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-2'>
                    <p>Enter Image of your Cafe</p>
                    <img src={Add} className='h-8 mr-2' name='image'></img> 
                    <input type="file" onChange={handleImageChange}
                    name='image' id="image-input" accept="image/*"
                    className='cursor-pointer mb-2'/>
                    {preview && <img src={preview} alt="preview" width="100" />}
                    {error.image && <p style={{ color: 'red' }}>{error.image}</p>}
                </label>


                <button type='submit' className='bg-[#fe6a36] text-white py-3 px-4 cursor-pointer'>Add</button>
                
            </form>
            { cafe && <button type="button" className=' text-black my-1 cursor-pointer'
            onClick={()=>navigate(-1)}>Cancel</button>}
        </div>
        <Footer/>
    </div>) :( 
        navigate("/login")
    )} </div>
    )
}
