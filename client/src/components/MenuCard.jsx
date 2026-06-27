import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
// import foodItems from '../../../server/models/foodItems';
import api from '../config/axios.js'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';

export const MenuCard = ({menu, image, name, price, rating, deliveryTime, className ,text1,text2 , onClick,id
    , item
 }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleAddToCart = (item) => {
        addToCart(item);
        toast.success(`${item.name} added to cart!`);
    };
  return (
    <div >
    <div key={item._id} className={`bg-white rounded-2xl shadow-md hover:shadow-lg 
        transition-shadow cursor-pointer overflow-hidden w-full
        flex flex-row
        `}>
            <div className='relative'>
                <img src={item.image} className='w-45 h-45 object-cover' />
                <div className='absolute top-3 left-3 bg-white rounded-full px-3 py-1 flex items-center gap-1 shadow-sm'>
                    <i className='fa-solid fa-star text-yellow-400 text-sm'></i>
                    <span className='font-semibold text-sm'>{rating} 5</span>
                </div>
            </div>

            {/* Info */}
            <div className=' justify-between'>
                <div className='p-4 flex flex-col gap-2'>
                    <h3 className='font-bold text-xl'>{item.name}</h3>
                    <p className='text-gray-400 text-sm'>₹{item?.price?.toLocaleString("en-IN")}</p>
                    <div className='flex items-center gap-2 text-gray-400 text-sm'>
                        <i className='fa-regular fa-clock'></i>
                        <span>{deliveryTime}5 min</span>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <div className='flex justify-center items-center
                    bg-[#fe6a37] px-4 w-auto h-8 hover:bg-[#ff6f3f] 
                    cursor-pointer m-4 rounded-2xl font-white'>
                        
                        <button onClick={() => navigate(`/menu/${item?._id}`)}
                        className='text-white cursor-pointer'
                        >{text1} </button>
                        <button
                        className='text-white cursor-pointer'
                        onClick={()=>handleAddToCart(item)}
                        >{text2}  </button>
                        
                    </div>
                </div>
            </div>

        </div>
         </div>
  )
}
