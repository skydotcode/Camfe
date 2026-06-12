import React,{ useEffect, useState }  from 'react'
import { Foodcard } from '../components/Foodcard';
import { Search } from '../components/Search';
import { Footer } from '../components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '#src/context/CartContext.jsx';
import { OrderSummary } from '#src/components/OrderSummary.jsx';
import { Back } from '#src/components/Back.jsx';
import api from '../config/axios.js'



export const Cafehome = () => {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const { id } = useParams();

    const [cafe, setCafe] = useState(null);
    const [menu, setMenu] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [about, setAbout] = useState(null);
    const [activeTab, setActiveTab] = useState('menu');

    useEffect(() => {
    const getItem = async () => {
      try {
        // const token = localStorage.getItem('token');
        const cafeRes = await axios.get(`/api/cafes/${id}` 
            // ,{
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }}
            );
        console.log(cafeRes.data.cafe);
        setCafe(cafeRes.data.cafe);
        setMenu(cafeRes.data.menu);
        console.log("menu",menu);
        
      } catch (err) {
        console.log("err msg",err.message);
      }
    };

    getItem();
  }, [id]);
  return (
    <div className='bg-[#faf8f3] min-h-screen'>
        <div className='flex h-1/3 x h-[33.33dvh] '>
            <img src={cafe?.image} 
            className='w-full object-cover '></img>
            <div className="absolute h-1/3 inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] rounded" />
            <Back/>
            <div className='absolute lg:top-45 top-40 lg:top-55  left-5 text-white '>
                <h1 className=' text-3xl font-bold'>{cafe?.name}</h1>
                <div className=''>
                    <i className='fa-solid fa-star text-yellow-400 text-sm'></i>
                    <span className='font-semibold text-sm mr-2'>5</span>
                    <i className="fa-regular fa-clock"></i>
                    <span>34-45</span>
                    
                </div>
            </div>
        </div>
        <div className='lg:pr-24 lg:pl-24 px-4 my-4 min-h-screen' >
            <Search/>
            <div className=''>
                <div className='bg-[#f5f0e8] pt-4 pb-4 rounded-full p-1 flex items-center gap-1 mb-4'>
                    <button
                        onClick={() => setActiveTab('menu')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            activeTab === 'menu' ? 'bg-white shadow-sm' : 'text-gray-500'
                        }`}
                    >
                        Menu
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            activeTab === 'reviews' ? 'bg-white shadow-sm' : 'text-gray-500'
                        }`}
                    >
                        Reviews
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            activeTab === 'about' ? 'bg-white shadow-sm' : 'text-gray-500'
                        }`}
                    >
                        About
                    </button>
                </div>
                {activeTab === 'menu' && 
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                {(menu?.length !== 0 ) ? menu?.map(item => (
                    <div key={item._id}>
                        <Foodcard
                        
                        image={item.image}
                        name={item.name}
                        price={item.price}
                        rating='4.7'
                        deliveryTime='20-25'
                        
                        text2 = "+ Add to Cart"
                        item = {item}
                        />
                    </div>)) : <p className='flex justify-center font-bold
                    text-2xl text-[#fe6a36]'>Nothingg to show !</p>}
                {/* {menu ===null && <p>Nothingg to show !</p>} */}
                    
                </div>}
                {activeTab === 'reviews' && reviews===null && <p className='flex justify-center font-bold
                    text-2xl text-[#fe6a36]'>Nothingg to show !</p>}
                {activeTab === 'about' && about===null && <p className='flex justify-center font-bold
                    text-2xl text-[#fe6a36]'>Nothingg to show !</p> }

            </div>
        </div>
        {cart.length>0 && <OrderSummary onclick={()=> navigate("/cart")}/>}
        <Footer/>
    </div>
  )
}
