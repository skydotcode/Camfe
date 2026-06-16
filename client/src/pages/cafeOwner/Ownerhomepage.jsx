import React, { useEffect, useState } from 'react'
import { Navbar } from '../../components/Navbar.jsx'
import { MenuManagement } from '../../components/owner-components/MenuManagement'
import { Orderspage } from '../../components/owner-components/Orderspage'
import { Footer } from '../../components/Footer'
import { useAuth } from '@/context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from '../../components/ui/Select.jsx'
import { NotFound } from '../NotFound'
import api from '../../config/axios.js'
import { Loading } from '../../components/ui/Loading';
import { toast } from 'react-toastify'


export const Ownerhomepage = () => {
    const { user ,cafe, isLoggedIn, logout ,loading} = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
    const { id } = useParams();
    const [cafes, setCafes] = useState( null);

    const [orders, setOrders] = useState([]);
    const [cafeId, setCafeId] = useState(() => localStorage.getItem('selectedCafeId'));
    

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn , navigate]);

    const handleCafeChange = (newId) => {
        localStorage.setItem('selectedCafeId', newId); // optional, Select already does this
        setCafeId(newId); // ← this triggers the useEffect to re-fetch
    };


    useEffect(() => {
        const fetchCafe = async () => {            
            const token = localStorage.getItem('token');
            const res = await api.get(`/api/cafe/${cafeId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCafes(res.data.data);  
        };
        if (cafeId) fetchCafe();
    }, [cafeId]);  


    // 2. fetch orders when activeTab or cafes changes
    useEffect(() => {
    if (activeTab !== 'orders' || !cafes?._id) return;

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await api.get(`/api/cafe/${cafes._id}/orders`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(res.data.data);
        } catch (err) {
            toast.error(err.response?.data || err.message);
        }
    };

    fetchOrders();
        const interval = setInterval(fetchOrders, 10000);
        return () => clearInterval(interval);

    }, [activeTab, cafes?._id]);  // ✅ runs when cafes updates



    const pendingOrders = () =>{
        let count = 0 ;
        for(let order of orders){
            if(order.status == "placed") {
                count++;
            }
        };
        return count ;
    }
    if (loading) return <Loading/>;
  return (
    
    <div >{ user?.role == "Cafe Owner" ? (
        <div className='min-h-screen'>
        <Navbar/>
        <div className='bg-[#faf8f3] px-4 lg:pr-24 lg:pl-24  min-h-screen' id='Ownerhomepage'>
            <div className=' pt-4 pb-2'>
                <h1 className='flex font-bold text-xl  pb-4 '>Dashboard -  <Select roles={cafe} onChangeFxn={handleCafeChange}/> </h1>
                <div className='flex h-1/3 x h-[33.33dvh]'>
                <img src={`${cafes?.image}?t=${new Date().getTime()}`} 
                className='w-full object-cover mb-4  rounded-xl '></img>
                                
                </div>
                <div className='grid grid-cols-1 grid-cols-3 gap-4 lg:gap-8'>
                    <div className='flex flex-col bg-white hover:shadow p-2
                    lg:p-8  gap-4 cursor-pointer'>
                        <div className='flex flex-row justify-between items-center'>
                            <p>Todays's Revenue</p>
                            <i className="fa-solid fa-indian-rupee-sign text-[]"></i>
                        </div>
                        <p><i className="fa-solid fa-indian-rupee-sign"></i>500 /-</p>
                    </div>
                    <div className='flex flex-col bg-white hover:shadow 
                    p-2
                    lg:p-8  gap-4 cursor-pointer'>
                        <div className='flex flex-row justify-between items-center'>
                            <p>Total Orders</p>
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <p><i className="fa-solid fa-arrow-trend-up"></i> {orders.length} </p>
                        
                    </div>
                    <div className='flex flex-col bg-white hover:shadow 
                    p-2
                    lg:p-8  gap-4 cursor-pointer'>
                        <div className='flex flex-row justify-between items-center'>
                            <p>Pending Orders</p>
                            <i className="fa-regular fa-clock"></i>
                        </div>
                        <p className='gap-8'><i className="fa-regular fa-clock"></i> {pendingOrders()} </p>
                    </div>
                </div>
            </div>
            <div className='bg-[#f5f0e8] pt-2 pb-2 px-2 rounded-full p-1 flex items-center gap-1 lg:my-4'>
                <button
                    onClick={() => setActiveTab('orders')} 
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        activeTab === 'orders' ? 'bg-white shadow-sm' : 'text-gray-500'
                    } ` }
                >
                    Orders
                </button>
                <button
                    onClick={() => {setActiveTab('menu')}}
                    className={`px-4 py-2 rounded-full text-sm  font-medium transition ${
                        activeTab === 'menu' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                >
                    Menu Management
                </button>
            </div>

            {activeTab === 'orders' && (cafes?.menu?.length > 0 ? <Orderspage orders={orders} /> : <p>Please add some Menu items to get Orders </p>)}
            {activeTab === 'menu' && <MenuManagement cafe={cafes} />}
        </div>
        <Footer/>
        </div>) : 
        <NotFound/>
      }
    </div> 
  )
}
