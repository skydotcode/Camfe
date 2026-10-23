import React, { useState } from 'react'
// import { MenuManagement } from '../../components/owner-components/MenuManagement'
import { OrderStatus } from '../../components/owner-components/OrderStatus'
import axios from 'axios';
import api from '../../config/axios.js'
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export const Orderspage = ({orders }) => {
    const placed   = orders.filter((o) => o.status === 'placed');
    const accepted = orders.filter((o) => o.status === 'accepted');
    const preparing     = orders.filter((o) => o.status === 'preparing');
    const ready     = orders.filter((o) => o.status === 'ready');
    const out_for_delivery     = orders.filter((o) => o.status === 'out_for_delivery');
    const delivered     = orders.filter((o) => o.status === 'delivered');
    const cancelled     = orders.filter((o) => o.status === 'cancelled');
    const [activeTab, setActiveTab] = useState('');
  return (
    <div >
        <p className='font-bold mt-2 text-2xl'><i className="fa-solid fa-clock text-[#fe6a37]"></i>Pending Orders:</p>
        <div className=''>
            {!orders || orders?.length === 0 ? <p className='text-sm'>No Pending orders...</p>:
            <OrderStatus ordersArray={placed} position={"placed"} />}
        </div>
        <p className='font-bold text-2xl'><i className="fa-solid fa-utensils text-[#fe6a37]"></i>Preparing:</p>
        {/* <KitchenIcon />
      <RestaurantIcon color="primary" /> */}
        
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={accepted} position={"accepted"}/>}
        </div>

        <p className='font-bold mt-2 text-2xl'><i className="fa-solid fa-boxes-packing text-[#fe6a37]"></i>Ready for Pickup:</p>
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={ready} position={"ready"}/>}
        </div>

        <p className='font-bold my-2 text-2xl'><i class="fa-solid fa-person-biking text-[#fe6a37]"></i>Out for Delivery:</p>
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={out_for_delivery} position={"out_for_delivery"}/>}
        </div>

        

        {/* <div className=''>

        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={orders} position={"delivered"}/>}
        </div> */}
        <div className='bg-[#f5f0e8] pt-2 pb-2 mb-2 rounded-full p-1 flex items-center gap-1'>
            <button
                onClick={() => setActiveTab('delivered')} 
                className={`px-4 py-2 rounded-full font-bold text-xl transition ${
                    activeTab === 'delivered' ? 'bg-white shadow-sm' : 'text-gray-500'
                } ` }
            >
                <i class="fa-solid fa-circle-check text-[#fe6a37]"></i>Delivered

            </button>
            <button
                onClick={() => {setActiveTab('cancelled')}}
                className={`px-4 py-2 rounded-full text-xl  font-bold transition ${
                    activeTab === 'cancelled' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
            >
            <i class="fa-solid fa-circle-xmark text-[#fe6a37]"></i>Cancelled

            </button>
        </div>
        {activeTab === 'delivered' && <OrderStatus ordersArray={delivered} position={"delivered"}/>}
        {activeTab === 'cancelled' && <OrderStatus ordersArray={cancelled} position={"cancelled"}/>}
    </div>
  )
}
