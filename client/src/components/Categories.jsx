import React from 'react'

export const Categories = () => {
  return (
    <div className='flex flex-col  gap-4 '>
        <p className='text-2xl  opacity-75'>Categories</p>
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4
        overflow-x-scroll '>
            <button className='flex flex-col justify-center gap-2 items-center 
            bg-white  h-22 border border-gray-500/50 cursor-pointer 
            hover:border-[#fe6a37] rounded-xl'>
                <i className="fa-solid fa-wine-glass text-3xl opacity-75"></i>
                Drinks</button>
            <button className='flex flex-col justify-center gap-2 items-center 
            bg-white  h-22 border border-gray-500/50 cursor-pointer
            hover:border-[#fe6a37] rounded-xl'>
                <i className="fa-solid fa-burger text-3xl opacity-75"></i>
                Snacks</button>
            <button className='flex flex-col justify-center gap-2  items-center 
            bg-white h-22 border border-gray-500/50 cursor-pointer
            hover:border-[#fe6a37] rounded-xl'>
                <i className="fa-solid fa-pizza-slice text-3xl opacity-75"></i>
                Meals</button>
            <button className='flex flex-col justify-center gap-2  items-center 
            bg-white  h-22 border border-gray-500/50 cursor-pointer
            hover:border-[#fe6a37] rounded-xl'>
                <i className="fa-solid fa-ice-cream text-3xl opacity-75"></i>
                Desserts</button>
        </div>
    </div>
  )
}
