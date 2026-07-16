import React from 'react'
// import { MenuManagement } from '../../components/owner-components/MenuManagement'
import { OrderStatus } from '../../components/owner-components/OrderStatus'
import axios from 'axios';
import api from '../../config/axios.js'
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';

export const Orderspage = ({orders }) => {
  return (
    <div >
        <p className='font-bold mt-2 text-2xl'><i className="fa-solid fa-clock text-[#fe6a37]"></i>Pending Orders:</p>
        <div className=''>
            {!orders || orders?.length === 0 ? <p className='text-sm'>No Pending orders...</p>:
            <OrderStatus ordersArray={orders} position={"placed"} />}
        </div>
        <p className='font-bold text-2xl'><i className="fa-solid fa-utensils text-[#fe6a37]"></i>Preparing:</p>
        {/* <KitchenIcon />
      <RestaurantIcon color="primary" /> */}
        
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={orders} position={"accepted"}/>}
        </div>
        <p className='font-bold mt-2 text-2xl'><i class="fa-solid fa-boxes-packing text-[#fe6a37]"></i>Ready for Pickup:</p>
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={orders} position={"ready"}/>}
        </div>

        <p className='font-bold my-2 text-2xl'><i class="fa-solid fa-person-biking text-[#fe6a37]"></i>Out for Delivery:</p>
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={orders} position={"out_for_delivery"}/>}
        </div>

        <p className='font-bold my-2 text-2xl'><i class="fa-solid fa-circle-check text-[#fe6a37]"></i>Delivered</p>
        <div className=''>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus ordersArray={orders} position={"delivered"}/>}
        </div>
    </div>
  )
}
