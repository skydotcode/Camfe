import { CartFooter } from '#src/components/CartFooter.jsx';
import { OrderTracker } from '#src/components/ui/OrderTracker.jsx';
// import { OrderTracker } from '#src/components/ui/OrderTracker.jsx';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NotFound } from './NotFound';
import { useAuth } from '#src/context/AuthContext.jsx';
import api from '../config/axios.js'

const steps = [
    { icon: <i class="fa-regular fa-clock"></i>, label: "Accepted by Cafe", status: "completed" },
    { icon: <i class="fa-solid fa-utensils"></i> , label: "Ready", status: "completed" },
    { icon:<i class="fa-solid fa-person-biking"></i>, label: "On the Way", status: "completed" },
    { icon: <i class="fa-solid fa-location-dot"></i>, label: "Delivered", status: "inprogress" },
];

export const MyOrders = () => {
  const {isLoggedIn , user} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        
    const token = localStorage.getItem('token');
     api.get('/api/orders/my' , {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(
        res => {setOrders(res.data.data)})
    .catch(
      err => toast.error(err));
    }, []);

    
    if (!orders) {
    return (
      <div className='flex flex-col h-screen bg-[#faf8f3]'>
        <CartFooter/>
        <div className='flex flex-col justify-center items-center h-screen gap-4'>
          <h1 className=''>You dont have any pending orders!</h1>
          <button onClick={() => navigate('/')} className='bg-[#fe6a36] text-white p-4 
          w-60 rounded-lg font-bold '>Browse Menu</button>
        </div>
      </div>
    );
  }

  const handleClick = async(id) =>{
    const token = localStorage.getItem('token');
    const res = await axios.put(`/api/orders/${id}/status`, {} , 
        {
          headers: {
            Authorization: `Bearer ${token}`
            }}      
    );
    toast(res.data.message);
    // navigate("/orders/my");
    // orders();
    window.location.reload();
  }
    if (orders?.length === 0) {
    return (
      <div className='flex flex-col h-screen bg-[#faf8f3]'>
        <CartFooter/>
        <div className='flex flex-col justify-center items-center h-screen gap-4'>
          <h1 className=''>Your don't have any orders!</h1>
          <button onClick={() => navigate('/')} className='bg-[#fe6a36] text-white p-4 
          w-60 rounded-lg font-bold '>Browse Menu</button>
        </div>
      </div>
    );
  }
  return (
    <> {(isLoggedIn && user?.role != "CafeOwner" ) ?
    <div className='gap-8'>
        <CartFooter/>
        { [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(order => (
        <div className='flex gap-8 flex-col p-4 lg:mx-24 ' key={order?._id}>
            <div className='rounded-xl shadow-md bg-[#faf8f3] p-2  lg:px-24 '>
                <div className=" rounded-2xl border border-gray-100 flex justify-left items-left  flex-col w-full">
                    <div className="flex justify-between mb-8 text-sm">
                        <div className="text-gray-400 space-y-1">
                            <p>Order ID</p>
                            <p>Delivery to</p>
                        </div>
                        <div className="text-right font-medium space-y-1">
                            <p>{order?._id}</p>
                            <p>{order?.deliveryLocation[0]} ,{order?.deliveryLocation[1]} </p>
                        </div>
                    </div>
                </div>
                
            
      { order?.items?.map((item , index) => (
        <div key={index} className='flex flex-col  '>
            <div className='flex flex-col  gap-4 
            '>
                {/* <div>
                    <img src={item.image} alt={item.name} width="300" className='rounded-xl'/>
                </div> */}
                <div className='flex flex-col gap-2 w-full  items-start'>
                    <h2 className='font-bold text-2xl'>{item?.name}</h2>
                    {/* <div className='w-full  flex justify-between items-center'>
                        <p className='text-xl'>₹{item.price}</p>
                        <div className='bg-[#f6f1e8] px-6 py-2  flex rounded-3xl gap-2 items-center justify-between'>
                            <button >-</button>
                            <span>{item.quantity}</span>
                            <button >+</button>
                        </div>
                        
                    </div> */}
                    <p className='text-'>Subtotal: ₹{item?.price * item?.quantity}</p>
                </div>

            </div>

            
        </div>
      ))}
      {order?.status === "cancelled" && 
      <div className='py-2'><p className='text-red-500 text-xl font-bold'>Cancelled</p></div>}
      {order?.status === "rejected" && 
      <div className='py-2'><p className='text-red-500 text-xl font-bold'>Order Rejected by Cafe :(</p></div>}
      {order?.status === "delivered" && 
      <div className='py-2'><p className='text-green-500 text-xl font-bold'>Order Delivered Successfully :)</p></div>}

      {order?.status !== "cancelled" && order?.status !== "rejected" && order?.status !== "delivered" && 
      <>
      <OrderTracker orderId={order?._id}/> <button  onClick={()=>handleClick(order?._id)}
              className='p-4 bg-[#fe6a37] text-white w-full border-rounded my-4 
              cursor-pointer'>Cancel Order <i className="fa-solid fa-trash-can text-white"
              ></i></button></>
      }
                            
        </div>
                            
      
        </div>))}


    </div> : 
    <NotFound/>}
    </>
  )
}
