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
import { Ownerhomepage } from './cafeOwner/Ownerhomepage';
import { socket } from '#src/socket.js';
import { Loading } from '#src/components/ui/Loading.jsx';

const steps = [
    { icon: <i class="fa-regular fa-clock"></i>, label: "Accepted by Cafe", status: "completed" },
    { icon: <i class="fa-solid fa-utensils"></i> , label: "Ready", status: "completed" },
    { icon:<i class="fa-solid fa-person-biking"></i>, label: "On the Way", status: "completed" },
    { icon: <i class="fa-solid fa-location-dot"></i>, label: "Delivered", status: "inprogress" },
];

export const MyOrders = () => {
  const {isLoggedIn , user , refreshUser , loading} = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [expandedOrders, setExpandedOrders] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem('token');
      let res = api.get('/api/orders/my' , {
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      .then(
          res => {setOrders(res.data.data) ;
            console.log(res)

          })
        
    }, []);

    useEffect(() => {
      if (!orders?.length) return;

      orders.forEach((o) => socket.emit('join-order', o._id));

      const onUpdate = (updated) => {
        setOrders((prev) =>
          prev.map((o) => (o._id === updated._id ? { ...o, status: updated.status } : o))
        );
      };

      socket.on('order-status-updated', onUpdate);
      return () => socket.off('order-status-updated', onUpdate);
    }, [orders.length]);

    if(loading) return <Loading/>;
    if (orders.length == 0) {
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
  const toggleExpand = (id) => {
    setExpandedOrders(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };
  const handleClick = async(order) =>{
    const token = localStorage.getItem('token');
    const res = await toast.promise(api.put(`/api/orders/${order?._id}/status`, {} , 
        {headers: {
          Authorization: `Bearer ${token}`
          }}      
    ) ,{
        pending: ' Checking you in...',
        success: 'Order Cancelled successfully :(',
        error: {
            render({ data }) {
                // shows actual error from backend
                return data?.response?.data?.error?.[0] 
                    || data?.response?.data?.err
                    || 'Something went wrong?';
            }
        }
        });
    // toast(res.data.message);
    // <Ownerhomepage cancelled={order}/>
    refreshUser();
  }
    if (orders?.length === 0) {
    return (
      <div className='flex flex-col h-screen bg-[#faf8f3]'>
        <CartFooter text={"Orders"}/>
        <div className='flex flex-col justify-center items-center h-screen gap-4'>
          <i className="fa-solid fa-box-open text-6xl opacity-50"></i>
          <h1 className=''>Your don't have any orders!</h1>
          <button onClick={() => navigate('/')} className='bg-[#fe6a36] text-white p-4 
          w-60 rounded-lg font-bold '>Browse Menu</button>
        </div>
      </div>
    );
  }
  console.log(new Date(orders[0].createdAt))
  return (
    <> {(isLoggedIn && user?.role != "CafeOwner" ) ?
    <div className=''>
        <CartFooter text={"Orders"}/>
        { [...orders]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(order => (
        <div className='flex gap-8 flex-col p-4 lg:mx-24 ' key={order?._id}>
            <div className='rounded-xl shadow-md bg-[#faf8f3] p-2  lg:mx-60 lg:p-4'>
                <div className=" rounded-3xl border border-gray-100 flex justify-left items-left  flex-col w-full">
                    <div className="flex justify-between  text-sm">
                        <div className="text-gray-400 ">
                            <p>Order ID :</p>
                            <p>Cafe : </p>
                            <p>Delivery at :</p>
                            <p>Time :</p>
                            
                            <p>Payment Method :</p>
                            <p>Total Payable Amount :</p>
                        </div>
                        <div className="text-right font-medium">
                            <p>#{order?._id.slice(-5)}</p>
                            <p>{order?.cafeId.name}</p>
                            <p>{order?.deliveryLocation[0]} ,{order?.deliveryLocation[1]} </p>
                            <p>{new Date(order.createdAt).toLocaleString()}</p>
                            
                            <p>{order?.paymentMethod}</p>
                            <p>₹{order?.totalPrice}</p>
                        </div>
                    </div>
                </div>
                
        <p className='text-xl font-bold text-gray-400'>Items :</p>
      { order?.items?.map((item , index) => (
        <div key={index} className='flex flex-col  '>
            <div className='flex flex-col   
            '>
                {/* <div>
                    <img src={item.image} alt={item.name} width="300" className='rounded-xl'/>
                </div> */}
                
                <div className='flex w-full  items-start'>
                    <h2 className='font-bold text-xl'>{item?.name}</h2>
                    <p className='text-sm'>: ₹{item?.price * item?.quantity}</p>
                    
                    {/* <div className='w-full  flex justify-between items-center'>
                        <p className='text-xl'>₹{item.price}</p>
                        <div className='bg-[#f6f1e8] px-6 py-2  flex rounded-3xl gap-2 items-center justify-between'>
                            <button >-</button>
                            <span>{item.quantity}</span>
                            <button >+</button>
                        </div>
                        
                    </div> */}
                    
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

      {order?.status !== "cancelled" && order?.status !== "rejected" && order?.status !== "delivered" && (
        <>
          
          {expandedOrders.includes(order._id) && (
            <>
              <OrderTracker orderId={order?._id} />
              <button
                onClick={() => handleClick(order)}
                className='p-2 bg-[#fe6a37] text-white w-full rounded-3xl cursor-pointer'
              >
                Cancel Order <i className="fa-solid fa-trash-can text-white"></i>
              </button>
              <div>
                <p className='my-2 text-gray-400'>Cafe Phone Number : <a href={`tel:+91${order?.cafeId.phone}`} className="phone-link text-black">
              <i class="fa-solid fa-phone"></i>Click to Call
            </a>
              </p>
              </div>
              
            </>
          )}
          <button
            onClick={() => toggleExpand(order._id)}
            className='p-2 mt-2 border border-[#fe6a37] text-[#fe6a37] w-full rounded-3xl cursor-pointer'
          >
            {expandedOrders.includes(order._id) ? "Hide Tracking" : "Track Order"}{" "}
            <i className={`fa-solid fa-chevron-${expandedOrders.includes(order._id) ? "up" : "down"}`}></i>
          </button>

        </>
      )}
                            
        </div>
                            
      
        </div>))}


    </div> : 
    <NotFound/>}
    </>
  )
}
