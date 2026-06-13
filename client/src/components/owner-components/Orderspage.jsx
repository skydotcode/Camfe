import React from 'react'
// import { MenuManagement } from '../../components/owner-components/MenuManagement'
import { OrderStatus } from '../../components/owner-components/OrderStatus'
import axios from 'axios';
import api from '../../config/axios.js'

export const Orderspage = ({orders }) => {
    
    // console.log(orders);
    // const [order, setOrder] = useState([]);
  return (
    <div className='mx-1 lg:mx-8'>
        <p className='font-bold py-4 pb-0'>Pending Orders</p>
        <div className='hover:shadow-md bg-white pb-8'>
            {!orders || orders?.length === 0 ? <p className='text-sm'>No Pending orders...</p>:
            <OrderStatus orders = {orders} position={"placed"} />}
        </div>
        <p className='font-bold py-4 pb-0'>Preparing</p>
        <div className='hover:shadow-md bg-white pb-8'>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus orders = {orders} position={"accepted"}/>}
        </div>
        <p className='font-bold py-4 pb-0'>Ready for Pickup</p>
        <div className='hover:shadow-md bg-white pb-8 '>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus orders = {orders} position={"ready"}/>}
        </div>

        <p className='font-bold py-4 pb-0'>Out for Delivery</p>
        <div className='hover:shadow-md bg-white pb-8 '>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus orders = {orders} position={"out_for_delivery"}/>}
        </div>

        <p className='font-bold py-4 pb-0'>Delivered</p>
        <div className='hover:shadow-md bg-white pb-8 '>
        {!orders || orders?.length === 0 ? <p className='text-sm'>No orders...</p>:
            <OrderStatus orders = {orders} position={"delivered"}/>}
        </div>
    </div>
  )
}
