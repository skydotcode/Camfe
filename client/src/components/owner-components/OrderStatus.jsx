import { useAuth } from '#src/context/AuthContext.jsx';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import api from '../../config/axios.js'
import { Loading } from '../ui/Loading.jsx';
import { socket } from '#src/socket.js';
import { useParams } from 'react-router-dom';

export const OrderStatus = ({ordersArray , position}) => {
  const {loading} = useAuth();
  // const { cafeId , loading} = useParams();
  // const [orders , setOrders] = useState(ordersArray );

  // useEffect(() => {
  //   setOrders(ordersArray);  // ✅ syncs state whenever prop updates
  // }, [ordersArray]);

    
  // const fetchOrders = async () => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const res = await api.get(`/api/cafe/${ordersArray[0]?.cafeId}/orders`, {
  //         headers: { Authorization: `Bearer ${token}` }
  //     });
  //     console.log(res.data.data);

  //     // setOrders(res.data.data);
  //   } catch (err) {
  //       toast.error(err.response?.data || err.message);
  //   }
  // };

    
  // useEffect(() => {
  //   const onUpdate = (order) => {
  //     setOrders((prev) =>
  //       prev.map((o) => (o._id === order._id ? order : o))
  //     );
  //     toast('Order updated!', { icon: '👏' });
  //   };

  //   socket.on('order-status-updated', onUpdate);
  //   return () => socket.off('order-status-updated', onUpdate);
  // }, []);

  const handleClick = async(orderId,status)=>{
    try{
      const token = localStorage.getItem('token');
      const res = await toast.promise(
        api.put(
          `/api/cafe/${ordersArray[0]?.cafeId}/orders`,
          { status, orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        {
          loading: '🍔 Updating the status...',
          success: 'Status updated!',
          error: (err) =>
            err?.response?.data?.errors?.[0] ||
            err?.response?.data?.error ||
            'Something went wrong?',
        }
      );
      console.log(res)
      

    }catch(err){
      toast.error(err);
    }
  }

  if (loading) return <Loading/>

  return (
    <div className="flex gap-2 overflow-x-auto p-4 scrollbar-thin">
      {
    ordersArray?.map((order) =>( 

      order.status === position &&
    <div key={order._id} className='flex flex-col bg-white p-4 shadow-sm rounded-2xl 
     cursor-pointer gap-2 flex-shrink-0 w-80'>
        {/* {position === "cancelled" && <p className='text-red-500'>Cancelled by the User</p>} */}
        <div className='border-b pb-2'>
            <span className='text-xs'>Order Id: {order._id}</span>
            <p className='text-xl font-bold'>Name: {order.customer.name}</p>
            <p>Phone No.:{order.customer.phone}</p>
        </div>
        <div>
            <p>Items : </p>
            {order?.items?.map((item)=>(
            <p className='text-sm text-gray-700 truncate' key={item._id}> {item.name}</p>
            ))}
            <p>Location :{order.deliveryLocation}</p>
            <div className='flex flex-row'>
              <p>Payment :{order.paymentMethod}</p>
              <p className='font-bold text-orange-500'>
                <i className="fa-solid fa-indian-rupee-sign text-sm"></i>{order.totalPrice}/-</p>
            </div>
        </div>
        {position === "placed" &&
        <div className='flex justify-between gap-4 '>
            <button className='w-1/2 bg-[#fe6a37] rounded-4xl 
            text-white p-2' onClick={()=>handleClick(order?._id ,"accepted")}>Accept</button>
            <button className='w-1/2 border border-gray-500/50 
            rounded-4xl p-2' onClick={()=>handleClick(order?._id , "rejected")}>Reject</button>
        </div>}
        {position === "accepted" &&
        <div className='flex justify-between gap-4 p-4'>
            <button className='w-full bg-[#fe6a37] rounded-4xl 
            text-white p-2' onClick={()=>handleClick(order?._id ,"ready")}
            >Mark as Ready</button>
        </div>}
        {position === "ready" &&
        <div className='flex justify-between gap-4 p-4'>
            <button className='w-full bg-[#fe6a37] rounded-4xl 
            text-white p-2' onClick={()=>handleClick(order?._id ,"out_for_delivery")}
            >Out for Delivery</button>
        </div>}
        {position === "out_for_delivery" &&
        <div className='flex justify-between gap-4 p-4'>
            <button className='w-full bg-[#fe6a37] rounded-4xl 
            text-white p-2' onClick={()=>handleClick(order?._id ,"delivered")}
            >Delivered</button>
        </div>}
    </div>
    ))
    }
  </div>)
}
