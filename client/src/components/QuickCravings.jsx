import React from 'react'
import api from '../config/axios.js'
import { useNavigate, useSearchParams } from 'react-router-dom';

export const QuickCravings = () => {
    const navigate = useNavigate();


    const handleClick = async (e) =>{
        let category = e?.currentTarget?.value;
        // const res = await api.get(`/api/search?q=${e.target.value}`);
        const imgElement = e.currentTarget.querySelector('img');
        let imgSrc = null;
        if (imgElement) {
            imgSrc = imgElement.src;
        }
        navigate("/menu/categories" , { 
            state: { category: category , img: imgSrc } 
        })
    }

    


  return (
    <div className='my-'>
        <p className='text-xl font-bold'>What's on your Mind?</p>
        <div className='flex flex-row gap-4 overflow-auto'>
            <div>
                <button className='w-30 cursor-pointer' value="Coffee" onClick={handleClick} ><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Coffee.png'
                
                /></button>
            </div>
            
            <div>
                <button className='w-30 cursor-pointer' value="North Indian" onClick={handleClick}><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/North%20Indian.png'/></button>
            </div>

            <div>
                <button className='w-30 cursor-pointer' value="Burger" onClick={handleClick}><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png'/></button>
            </div>
            <div>
                <button className='w-30 cursor-pointer' value="Pizza" onClick={handleClick}><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png'/></button>
            </div>
            <div>
                <button className='w-30 cursor-pointer'value="Dosa" onClick={handleClick}><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png'/></button>
            </div>
            <div>
                <button className='w-30 cursor-pointer' value="Paratha" onClick={handleClick}><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Paratha.png'/></button>
            </div>
            <div>
                <button className='w-30 cursor-pointer ' value="Pastry" onClick={handleClick}><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png'/></button>
            </div>
            
        </div>
    </div>
  )
}
