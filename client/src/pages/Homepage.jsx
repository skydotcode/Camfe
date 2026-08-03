import React from 'react'
import { Navbar } from '../components/Navbar';
import { Search } from '../components/Search';
import { Categories } from '../components/Categories';
import { Cafes } from '../components/Cafes';
import { Footer } from '../components/Footer';


export const Homepage = () => {
  return (
    <div className='bg-[#faf8f3] '>
      <Navbar/>
      <div className='lg:px-30 px-4 min-h-screen'>
        <Search/>
        <Categories/>
        {/* <div className='flex justify-center items-center flex-col'>
          <img className='m-4 lg:h-160 rounded-2xl shadow-md' src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/v1784630810/ezvzcckp59muhipo7ej2.png`} />
          <p className='text-3xl text-[#fe6a37] font-bold'>Our Backend Server is down :(</p>
          <p>Will be back soon...</p>
        </div> */}
        
        <Cafes />
        {/* <Fooditems/> */}
      </div>
      <Footer/>
    </div>
  )
}
