import React from 'react'
import { useNavigate } from 'react-router-dom';

export const CartFooter = () => {
    const navigate = useNavigate();
  return (
    <div className='flex flex-row items-center px-4 shadow-md bg-white py-2
        sticky top-0 z-10'>
            <button className=' top-3 left-3 bg-white rounded-full w-9 h-9 
                flex items-center justify-center shadow-md cursor-pointer'
                 onClick={() => navigate(-1 , { replace: true })}
                >
                    <i className='fa-solid fa-arrow-left text-sm'></i>
                </button>
                <h1 className='text-xl font-bold py-4 px-4 '>Your Cart</h1>
      
    </div>
  )
}
