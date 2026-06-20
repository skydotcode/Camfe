import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../config/axios.js'

export const CartFooter = ({text}) => {
    const navigate = useNavigate();
    console.log(text);
  return (
    <div className='flex flex-row items-center px-4 shadow-md bg-white py-2
        sticky top-0 z-10'>
            <button className=' top-3 left-3 bg-white rounded-full w-9 h-9 
                flex items-center justify-center shadow-md cursor-pointer'
                 onClick={() => navigate(-1 , { replace: true })}
                >
                    <i className='fa-solid fa-arrow-left text-sm'></i>
                </button>
                <h1 className='text-xl font-bold py-4 px-4 '>Your {text}</h1>
      
    </div>
  )
}
