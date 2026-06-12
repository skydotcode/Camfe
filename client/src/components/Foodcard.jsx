import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
// import foodItems from '../../../server/models/foodItems';
import api from '../config/axios.js'

export const Foodcard = ({ image, name, price, rating, deliveryTime, className ,text1,text2 , onClick,id
    , item
 }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(item);
        toast.success(`${name} added to cart!`);
    };
  return (
    <div className={`bg-white rounded-2xl shadow-md hover:shadow-lg 
        transition-shadow cursor-pointer overflow-hidden w-full ${className} `}>
            
            {/* Image with rating badge */}
            <div className='relative'>
                <img src={image} className='w-full h-52 object-cover' />
                <div className='absolute top-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm'>
                    <i className='fa-solid fa-star text-yellow-400 text-sm'></i>
                    <span className='font-semibold text-sm'>{rating}</span>
                </div>
            </div>

            {/* Info */}
            <div className='flex flex-row justify-between'>
                <div className='p-4 flex flex-col gap-2'>
                    <h3 className='font-bold text-xl'>{name}</h3>
                    <p className='text-gray-400 text-sm'>₹{price?.toLocaleString("en-IN")}</p>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <i className='fa-regular fa-clock'></i>
                        <span>{deliveryTime} min</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex  bg-[#fe6a37] pr-4 pl-4 h-8 hover:bg-[#ff6f3f] cursor-pointer m-4 rounded-2xl font-white'>
                        <button onClick={() => onClick(id)}
                        className='text-white cursor-pointer'
                        >{text1} </button>
                        <button
                        className='text-white cursor-pointer'
                        onClick={handleAddToCart}
                        >{text2} </button>
                        
                    </div>
                </div>
            </div>

        </div>
  )
}
