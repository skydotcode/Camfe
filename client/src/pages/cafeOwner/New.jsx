import React, { useEffect, useState } from 'react'
import Add from "../../images/img.png";
const adminId = import.meta.env.VITE_ADMIN_ID;
const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useParams } from 'react-router-dom';
import api from '../../config/axios.js'


export const New = () => {
    const navigate = useNavigate();
    const { id , isLoggedIn } = useParams();

    const [image , setImage] = useState(null);
    const [preview , setPreview] = useState(null);
    const [error , setError ] = useState({});

    const [formData, setFormData] = useState({
        name : "" , 
        price : "" ,
        image : "" ,
    });

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn , navigate]);

    const handleChange =(e)=>{
        setFormData({ ...formData , [e.target.name]:e.target.value})
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
        if(!formData.name.trim()) newErrors.name = "name is required" 
        // else if(!name) newErrors.name = "enter valid name"
        
        if(!formData.price.trim()) newErrors.price = "Price is required" 
        else if(!(formData.price >= 0)) newErrors.price = "enter valid price"

        if(!image) newErrors.password = "Image is required"
        // else if(!file.length < 6) newErrors.password = "minimum 6 characters required"

        return newErrors;

    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        let newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setError(newErrors);
            return;
        }
            
        const data = new FormData();
        data.append('foodItems[name]', formData.name);
        data.append('foodItems[price]', formData.price);
        data.append("image" , image);

        const token = localStorage.getItem('token');
        let res =  await toast.promise( api.post(`/api/${id}/menu`, data,{
            headers: {
                Authorization: `Bearer ${token}`}
        }) , {
            pending: '🍔 Uploading food item...',
            success: '✅ Food item added!',
            error: {
                render({ data }) {
                    return data?.response?.data?.errors?.[0] 
                        || data?.response?.data?.error 
                        || 'Something went wrong?';
                }
            }
        });
        navigate(`/cafe/${res?.data?.data?._id}`);  
    }
  return (
    <div className='flex flex-col  overflow-y-scroll flex-col min-h-screen'>

    <Navbar/>
    <div className='flex content-center items-center w-full  flex-grow  flex flex-col gap-4 
                justify-center 
                p-4 md:px-10 md:pt-4 bg-[#faf8f3] '>
        
        <p className='text-3xl font-bold'>Add a new Food Item:</p>
        <form className='flex flex-col gap-4 px-8' onSubmit={handleSubmit}>
            <label htmlFor="name">Item Name:</label>
            <input placeholder='Enter Item Name...'  name="name" value={formData.name}
            onChange={handleChange} type='text'
            className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
            {error.name && <p className='text-red-500 text-xs'>{error.name}</p>}


            <label htmlFor="price">Enter Selling Price:</label>
            <input placeholder='Enter item price...'  name="price" 
            value={formData.price}
            onChange={handleChange} 
            className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
            {error.price && <p className='text-red-500 text-xs'>{error.price}</p>}

            <label htmlFor="image-input" name='image' className='m-2 cursor-pointer flex flex-col md:flex-row items-start md:items-center gap-2r'>
                <img src={Add} className='h-8 mr-2' name='image'></img> 
                <input type="file" onChange={handleImageChange}
                name='image' id="image-input" accept="image/*"
                className='cursor-pointer'/>
                {preview && <img src={preview} alt="preview" width="100" />}
                {error.image && <p style={{ color: 'red' }}>{error.image}</p>}
            </label>
            <button className='bg-[#fe6a36] text-white py-3 px-4 cursor-pointer'>Submit</button>
            <button onClick={() => navigate(-1 , { replace: true })}>go back</button>
        </form>
    </div>
    <Footer/>
    </div> 
  )
}
