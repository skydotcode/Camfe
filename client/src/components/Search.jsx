import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Typed from 'typed.js';
import api from '../config/axios.js'

export const Search = () => {
  const { user, isLoggedIn, logout ,loading} = useAuth();
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Search for coffee...", "Find your cafe..."],
      typeSpeed: 50,
      backSpeed: 30,
      loop: true,
      attr: 'placeholder', // targets the placeholder
    });

    return () => typed.destroy();
  }, []);
  return (
    <div className='flex flex-col gap-2 pt-4 pb-4 sticky top-0 z-10 bg-[#faf8f3]'>
        <p className='text-3xl font-bold'>Good Afternoon {user?.name}</p>
        <p>What would you like to eat today?</p>
        <form className='border border-gray-500/25 p-2 
        gap-4 flex flex-row items-center
        bg-white'>
            <label htmlFor = "search"></label>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input ref={el} className='w-full outline-none'  />
        </form>
    </div>
  )
}
