import { useCart } from '#src/context/CartContext.jsx';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../config/axios.js'

export const OrderSummary = ({onclick}) => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  return (
    <div className='
    flex flex-row justify-between px-8   py-4 bg-white fixed bottom-0 left-0 
    w-full lg:px-44 shadow-md '>
        <div onClick={clearCart} className='flex justify-center items-center cursor-pointer'>
            <button ><i className="fa-solid fa-trash-can text-red-500"></i></button>
             <p>clear cart</p>
        </div>
        <button onClick={onclick} className='bg-[#fe6a36] p-4 text-white cursor-pointer
        rounded-2xl font-bold' >Proceed to Checkout</button>
      </div>
  )
}
