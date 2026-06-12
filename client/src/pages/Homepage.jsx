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
      <div className='lg:pr-24 lg:pl-24 pl-4 pr-4 min-h-screen'>
        <Search/>
        <Categories/>
        <Cafes />
        {/* <Fooditems/> */}
      </div>
      <Footer/>
    </div>
  )
}
