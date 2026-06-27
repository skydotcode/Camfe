import React, { useState } from 'react';
import api from '../config/axios.js'
import { MenuCard } from './MenuCard.jsx';
import { Fooditems } from './Fooditems.jsx';
import { useAuth } from '#src/context/AuthContext.jsx';
import { Loading } from './ui/Loading.jsx';

export const Categories = () => {
    const {loading} = useAuth();
    const [menu , setMenu] = useState();
    const [category , setCategory] = useState();

    const handleClick =async (e)=>{
        setCategory(e.target.value);
        const res = await api.get(`/api/menu?category=${e.target.value}`);
        setMenu(res.data.data);
    };

    if(loading) return <Loading/>;

  return (
    <div >
        <div className='flex flex-col  gap-2 '>
            <p className='text-2xl  opacity-75'>Categories</p>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4
            overflow-x-scroll '>
                <button className='flex flex-col justify-center gap-2 items-center 
                bg-white  h-20 border border-gray-500/50 cursor-pointer 
                hover:border-[#fe6a37] rounded-xl focus:border-[#fe6a37]'
                name = "Drinks"
                value= "Drinks"
                onClick={handleClick}>
                    <i className="fa-solid fa-wine-glass text-3xl opacity-75"></i>
                    Drinks</button>

                <button className='flex flex-col justify-center gap-2 items-center 
                bg-white  h-20 border border-gray-500/50 cursor-pointer
                hover:border-[#fe6a37] rounded-xl focus:border-[#fe6a37]'
                name = "Snacks"
                value= "Snacks"
                onClick={handleClick}>
                    <i className="fa-solid fa-burger text-3xl opacity-75"></i>
                    Snacks</button>

                <button className='flex flex-col justify-center gap-2  items-center 
                bg-white h-20 border border-gray-500/50 cursor-pointer
                hover:border-[#fe6a37] rounded-xl focus:border-[#fe6a37]'
                name = "Meals"
                value= "Meals"
                onClick={handleClick}>
                    <i className="fa-solid fa-pizza-slice text-3xl opacity-75"></i>
                    Meals</button>
                <button className='flex flex-col justify-center gap-2  items-center 
                bg-white  h-20 border border-gray-500/50 cursor-pointer
                hover:border-[#fe6a37] rounded-xl focus:border-[#fe6a37]'
                name = "Desserts"
                value= "Desserts"
                onClick={handleClick}>
                    <i className="fa-solid fa-ice-cream text-3xl opacity-75"></i>
                    Desserts</button>
            </div>
        </div>
        {category && 
        <div className='my-2'>
            <p className='text-2xl'>Delecious {category} for you!</p>
            <div  
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {(menu?.length !== 0 ) ? menu?.map((item) => (
                <MenuCard
                key={item._id}
                item = {item}
                text2={"Add to Cart"}
                />  
                )) : <p className='flex justify-center font-bold
                    text-xsm text-[#fe6a36]'>No Menu :( </p>} 
            </div>   
        </div>}
    </div>
  )
}
