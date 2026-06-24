import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios.js'
import { Loading } from './ui/Loading.jsx';



export const Cafecard = ({cafe, image, name, category, rating, deliveryTime }) => {
    const navigate = useNavigate();
    const {loading} = useAuth();
    if(loading) return <Loading/>;
    return (
        <div>
       <div key={cafe._id} className='bg-white rounded-2xl shadow-md hover:shadow-lg 
        transition-shadow cursor-pointer overflow-hidden w-full'
        onClick={()=> navigate(`/cafe/${cafe?._id}`)}
        >
            {/* Image with rating badge */}
            <div className='relative'>
                <img src={cafe.image} className='w-full h-52 object-cover' />
                <div className='absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm'>
                    <i className='fa-solid fa-star text-yellow-400 text-sm'></i>
                    <span className='font-semibold text-sm'>{rating} 5</span>
                </div>
            </div>

            {/* Info */}
            <div className='p-4 flex flex-col gap-2'>
                <h3 className='font-bold text-xl'>{cafe.name}</h3>
                {/* <p className='text-gray-400 text-sm'>{cafe.category}</p> */}
                <div className='flex items-center gap-2 text-gray-400 text-sm'>
                    <i className='fa-regular fa-clock'></i>
                    <span>{deliveryTime}4 min</span>
                </div>
            </div>

        </div>
        </div>
    )
}