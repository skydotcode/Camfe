import { Back } from '#src/components/Back.jsx'
import { CartFooter } from '#src/components/CartFooter.jsx'
import { Footer } from '#src/components/Footer.jsx'
import { Menu } from '#src/components/Menu.jsx'
import { Navbar } from '#src/components/Navbar.jsx'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import api from '../config/axios.js'
import { MenuCard } from '#src/components/MenuCard.jsx'
import { ShoppingCartIcon } from 'lucide-react'

export const Category = () => {
    const location = useLocation();
    const [menus , setMenus] = useState();
    const { category, img } = location.state || {}; 
    console.log(category , img)

    const getMenus = async ()=>{
        const res = await api.get(`/api/search?q=${category}`);
        console.log(res);
        setMenus(res?.data?.data?.menus);
        console.log(menus)
    }

    useEffect(()=>{
        getMenus() ;
    } , [category])

  return (
    <div className='bg-[#faf8f3]'>
        <CartFooter text={"Bugers"}/>
        <div className='lg:px-30 px-4 min-h-screen '>
            <img className='w-40 '
                src={img} 
            />
        {menus && (
            <div  
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
                {(menus?.length !== 0 ) ? menus.map((item) => (
                <MenuCard
                key={item._id}
                item = {item}
                text2={<ShoppingCartIcon fontSize="small" />}
                />  
                )) : <p className='flex justify-center font-bold
                    text-xsm text-[#fe6a36]'>No Menu :( </p>} 
            </div>   
            
        )}
            
        </div>
        <Footer/>
    </div>
  )
}
