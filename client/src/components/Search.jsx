import { useAuth } from '@/context/AuthContext';
import React, { useEffect, useRef, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'
import Typed from 'typed.js';
import api from '../config/axios.js'
import { Loading } from './ui/Loading.jsx';
import { toast } from 'react-toastify';
import { MenuCard } from './MenuCard.jsx';
import { Cafecard } from './Cafecard.jsx';
import { useCart } from '#src/context/CartContext.jsx';
import { Cafes } from './Cafes.jsx';

export const Search = () => {
  const { user, isLoggedIn, logout ,loading} = useAuth();
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
  
  const [query , setQuery] = useState("");
  const [menu , setMenu] = useState();
  const [cafe , setCafe] = useState();
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

  const handleChange = async (e)=>{
    try{
      e.preventDefault();
      setQuery(e.target.value);
      const res = await api.get(`/api/search?q=${e.target.value}`);
      setCafe(res.data.data.cafes);
      setMenu(res.data.data.menus);
    }catch(e){
      toast.error(e);
    }
  }

  return (

    // <div className='flex flex-col gap-2 pt-4 pb-4 sticky top-0 z-10 bg-[#faf8f3] '>
    //     <p className='text-3xl font-bold'>Good Afternoon {user?.name}</p>
    //     <p>What would you like to eat today?</p>
    //     <form className='border border-gray-500/25 p-2 
    //     gap-4 flex flex-row items-center
    //     bg-white' onSubmit={(e) => e.preventDefault()}>
    //         <label htmlFor = "search"></label>
    //         <i className="fa-solid fa-magnifying-glass"></i>
    //         <input ref={el}
    //         value={query} 
    //         onChange={handleChange} 
    //         className='w-full outline-none'  />
    //     </form>

    //     { (cafe || menu) &&
    //       <div className='my-2 h-100px w-30px overflow-y-auto'>
    //         <p>Search Results:</p>
    //         {/* <MenuCard menu = {menu} text2={"Add to Cart"}/>
    //         <hr className='my-2'></hr>
    //         <Cafecard cafes={cafe}/> */}

    //               {menu.map(item => (
    //     <div key={item._id} className='flex flex-col bg-[#faf8f3]     gap-4 '>
    //         <div className='flex bg-white rounded-xl p-4 shadow-md gap-4 justify-center items-center'>
    //             <div>
    //                 <img src={item.image} alt={item.name} width="300" className='rounded-xl'/>
    //             </div>
    //             <div className='flex flex-col gap-2 w-full  items-start'>
    //                 <h2 className='font-bold text-2xl'>{item.name}</h2>
    //                 <div className='w-full  flex justify-between items-center'>
    //                     <p className='text-xl'>₹{item.price}</p>
    //                     <div className='bg-[#f6f1e8] px-6 py-2  flex rounded-3xl gap-2 items-center justify-between'>
    //                         <button onClick={() => decreaseQuantity(item._id)}>-</button>
    //                         <span>{item.quantity}</span>
    //                         <button onClick={() => increaseQuantity(item._id)}>+</button>
    //                     </div>
                        
    //                 </div>
    //                 <p className='text-'>Subtotal: ₹{item.price * item.quantity}</p>
    //                 <button >Remove <i className="fa-solid fa-trash-can text-red-500"
    //                 onClick={() => removeFromCart(item._id)}></i></button>
    //             </div>
    //         </div>

    //       {/* quantity controls */}
          

    //       {/* subtotal for this item */}


    //     </div>
    //   ))}

    //       </div>
    //     }
    // </div>
    <div className="flex flex-col gap-3 pt-4 pb-4 sticky 
    top-0 z-10  bg-[#faf8f3]">
      <div>
        <p className="text-3xl font-bold text-gray-900">Good Afternoon {user?.name}</p>
        <p className="text-gray-500 mt-1">What would you like to eat today?</p>
      </div>

      <form
        className='border border-gray-500/25 p-2 gap-4 flex flex-row items-center
        bg-white'
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="search" className="sr-only">Search cafes or menu items</label>
        <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
        <input
          id="search"
          ref={el}
          value={query}
          onChange={handleChange}
          placeholder="Search for cafes, dishes..."
          className='w-full outline-none'    />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
            
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </form>

{query && (
  <div className="my-2 max-h-[60vh] 
  overflow-y-auto ">
    <p className="text-sm font-semibold text-gray-500 mb-2 sticky top-0 z-10 bg-[#faf8f3]">
      Search results for "{query}"
    </p>

    {(cafe || menu) ? (
      <div className="flex flex-col gap-4">
        {menu && (
          <div  
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 '>
              {(menu?.length !== 0 ) ? menu.map((item) => (
              <MenuCard
              key={item._id}
              item = {item}
              text2={"+"}
              />  
              )) : <p className='flex justify-center font-bold
                    text-xsm text-[#fe6a36]'>No Menu :( </p>} 
          </div>   
            
        )}

        {cafe && (
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">Cafes</p>
            <div >
              <Cafes cafeListing={cafe} />
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <i className="fa-solid fa-mug-hot text-3xl text-[#fe6a36]/40 mb-2"></i>
        <p className="font-semibold text-gray-700">No matches for "{query}"</p>
        <p className="text-sm text-gray-400">Try a different cafe or dish name</p>
      </div>
    )}
  </div>
)}
</div>
  )
}
