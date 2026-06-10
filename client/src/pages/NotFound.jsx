import React from 'react'
import { Navbar } from '../components/Navbar'

export const NotFound = () => {
  return (
    <div className='flex flex-col bg-[#faf8f3] w-full h-screen'>
        <Navbar/>
        <p className='font-bold text-4xl text-[#fe6a36] 
        flex align-center justify-center' >Page not found !</p>
    </div>
  )
}
