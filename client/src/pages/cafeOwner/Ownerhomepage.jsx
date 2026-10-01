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
// import { ToggleButton } from '@mui/material'
// import ToggleSwitch from '#src/components/ui/ToggleSwitch.jsx'
// import { Switch } from "@material-tailwind/react";
// import { Toggle , HStack} from 'rsuite';
// import 'rsuite/dist/rsuite.css';
import Switch from '@mui/material/Switch';


export const Ownerhomepage = () => {
    const { user ,cafe, isLoggedIn, logout ,loading} = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('');
    const { id } = useParams();
    const [cafes, setCafes] = useState( null);
    const [checked, setChecked] = useState(true);

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
            setCafes(res?.data?.data); 
            console.log(res) 
            setChecked(res?.data.data.isOpen)
        };
        if (cafeId) fetchCafe();
    }, [cafeId]);  
    
    useEffect(() => {
        if (!cafe || cafe.length === 0) return;

        const storedId = localStorage.getItem('selectedCafeId');
        const validStoredId = cafe.some(c => c._id === storedId) ? storedId : null;

        if (validStoredId) {
            if (validStoredId !== cafeId) setCafeId(validStoredId);
        } else {
            const firstId = cafe[0]._id;
            localStorage.setItem('selectedCafeId', firstId);
            setCafeId(firstId);
        }
    }, [cafe]);


    // 2. fetch orders when activeTab or cafes changes
    useEffect(() => {
        if (activeTab !== 'orders' || !cafes?._id) return;

        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await api.get(`/api/cafe/${cafes._id}/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrders(res?.data?.data);
            } catch (err) {
                toast.error(err.response?.data || err.message);
            }
        };

        fetchOrders();
        const interval = setInterval(fetchOrders, 5000);
        return () => clearInterval(interval);

    }, [activeTab, cafes?._id ]); 
    
    const handleChange = async(event)=>{
        console.log(event.target.checked)
        setChecked(event.target.checked);
        const storedId = localStorage.getItem('selectedCafeId');
        
        if(storedId){
            const token = localStorage.getItem('token');
            let res =  await toast.promise( 
                api.put(`/api/cafe/${storedId}`, 
                    { 
                        isOpen:event?.target?.checked
                    },
                    {
                    headers: {
                        Authorization: `Bearer ${token}`}
                }) , {    
                pending: ' Validating your review...',
                success: ' Cafe Status Updated!',
                error: {
                    render({ data }) {
                        return data?.response?.data?.errors?.[0] 
                            || data?.response?.data?.error 
                            || 'Something went wrong?';
                    }
                }
                });
        }

        

    }



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
    const label = { slotProps: { input: { 'aria-label': 'Color switch demo' } } };
  return (
    
    <div >{ user?.role == "Cafe Owner" ? (
        <div className='min-h-screen'>
            
        <Navbar className={"sticky top-0 z-10"}/>
        
        <div className='bg-[#faf8f3] px-4 lg:px-30  min-h-screen' id='Ownerhomepage'>
            <div className=' pt-4 pb-2 relative'>
                <h1 className='flex font-bold text-xl  pb-4 '>
                    Dashboard -  <Select roles={cafe || []} value={cafeId} onChangeFxn={handleCafeChange}/> 
                </h1>
                
                <div className='flex h-1/3 x h-[25dvh]'>
                <img alt='Please Select Cafe' src={`${cafes?.image}?t=${new Date().getTime()}`} 
                className='w-full object-cover mb-4  rounded-2xl shadow-md'>
                    
                </img>
                <div className='flex absolute mt-2 right-5 bg-black/30 backdrop-blur-md rounded-3xl items-center p-2 '>
                    <p className='text-white'>Closed</p>
                    <Switch checked={checked}
                    onChange={handleChange} color='warning'
                    slotProps={{ input: { 'aria-label': 'controlled' } }} />
                    <p className='text-white'>Open</p>
                </div>
                
                
                
                                
            </div>
            <div className='grid grid-cols-1 grid-cols-3 gap-1 lg:gap-8 '>
                <div className='flex flex-col bg-white p-4
                lg:p-8 gap-2 shadow-sm rounded-2xl'>
                    <div className='flex flex-row justify-between items-center'>
                        <p>Todays's Revenue</p>
                        <i className="fa-solid fa-indian-rupee-sign
                        text-[#29c244]"></i>
                    </div>
                    <p className='text-2xl text-[#29c244] font-bold'
                    >500/-</p>
                </div>
                <div className='flex flex-col bg-white hover:shadow 
                p-4 shadow-sm rounded-2xl
                lg:p-8  gap-2 cursor-pointer'>
                    <div className='flex flex-row justify-between items-center'>
                        <p>Total Orders</p>
                        <i className="fa-solid fa-arrow-trend-up text-[#29c244]"></i>
                    </div>
                    <p className='text-2xl text-[#29c244] font-bold'
                    >{orders.length} </p>
                    
                </div>
                <div className='flex flex-col bg-white hover:shadow 
                p-4 shadow-sm rounded-2xl
                lg:p-8  gap-4 cursor-pointer'>
                    <div className='flex flex-row justify-between items-center'>
                        <p>Pending Orders</p>
                        <i className="fa-regular fa-clock text-[#ef4743]"></i>
                    </div>
                    <p className='text-2xl text-[#ef4743] font-bold'
                    > {pendingOrders()} </p>
                </div>
                </div>
            </div>
            <div className='bg-[#f5f0e8] pt-2 pb-2 rounded-full p-1 flex items-center gap-1 lg:my-4'>
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
