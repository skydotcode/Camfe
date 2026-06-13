import { useAuth } from '#src/context/AuthContext.jsx';
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify';
import api from '../../config/axios.js'

export const OrderStatus = ({orders , position}) => {
  const {loading} = useAuth();
  console.log(position);
  const handleClick = async(orderId,status)=>{
    try{
      console.log(orderId);
      const token = localStorage.getItem('token');
      console.log("token" , token)
      let res = await api.put(`/api/cafe/${orders[0]?.cafeId}/orders`, 
        {status , orderId} , 
        {headers: {
          Authorization: `Bearer ${token}` 
        }},
        
      );

      console.log("res",res.data.message);
      
      toast.success(res.data.message);
      // window.location.reload();

    }catch(err){
      console.log(err);
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    orders?.map(order =>( 

      order.status === position &&
    <div key={order._id} className='flex flex-col bg-white p-2 rounded-xl 
     cursor-pointer gap-4'>
        <div>
            <p>{order._id} id</p>
            <p>{order.customer.name}</p>
            <p>{order.customer.phone}</p>
        </div>
        <div>
            {order?.items?.map((item)=>(
            <p key={item._id}>Items : {item.name}</p>))}
            <p>Location :{order.deliveryLocation}</p>
            <p><i className="fa-solid fa-indian-rupee-sign"></i>{order.totalPrice}/-</p>
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
        {/* {position === "ready" &&
        <div className='flex justify-between gap-4 p-4'>
            <button className='w-full bg-[#fe6a37] rounded-4xl 
            text-white p-2' onClick={()=>handleClick(order?._id ,"out_for_delivery")}
            >Out for Delivery</button>
        </div>} */}
        {position === "out_for_delivery" &&
        <div className='flex justify-between gap-4 p-4'>
            <button className='w-full bg-[#fe6a37] rounded-4xl 
            text-white p-2' onClick={()=>handleClick(order?._id ,"delivered")}
            >Delivered</button>
        </div>}
        <hr></hr>
    </div>
    ))
  )
}
