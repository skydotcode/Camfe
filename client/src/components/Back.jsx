import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Back = () => {
    const navigate = useNavigate();
  return (
    <div>
        <button className='absolute top-5 left-5 bg-white rounded-full w-9 h-9 
        flex items-center justify-center shadow-md cursor-pointer'
        onClick={() => navigate(-1 , { replace: true })}
        >
            <i className='fa-solid fa-arrow-left text-sm'></i>
        </button>
    </div>
  )
}
