import React from 'react'
import { toast } from 'react-toastify'
import { Navbar } from '../components/Navbar';
export const Error = () => {
    toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
    });

  return (
    <div>
        <Navbar/>
        <p>Something went Wrong!</p>
    </div>
  )
}
