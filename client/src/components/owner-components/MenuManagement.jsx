import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Foodcard } from '../Foodcard';
import api from '../config/axios.js'



export const MenuManagement = ({cafe }) => {     
    const navigate = useNavigate();
    const [foodItems, setFoodItems] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

    //  useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     axios.get('/api/cafe/:id/menu' , {
    //         headers: {
    //             Authorization: `Bearer ${token}`
    //     }})
    //        .then(res => {
    //          return res.json()})
    //        .then(data => {
    //          setFoodItems(data);
    //          setLoading(false);
    //        })
    //        .catch(err => {
    //          setError(err.message);
    //          setLoading(false);
    //        });
    //    }, []);
    console.log(cafe);
  return (
    <div className=''>
        <div className='flex flex-col  gap-4  pt-2 pb-8 '>
            <div className='flex justify-between items-center'>
              <p className='text-2xl'>Your Listed Items</p>
              <form>
              <button onClick={()=>navigate(`/${cafe?._id}/menu`)}
              className='flex  bg-[#fe6a37] pr-4 pl-4 h-8 hover:bg-[#ff6f3f] cursor-pointer 
              m-4 rounded-2xl text-white items-center '
              >+ Add Item</button>
              </form>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                {cafe?.menu.map(item => (
                  <div key={item._id}> <Foodcard
                  key={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                rating='4.7'

                deliveryTime='20-25'
                text1 = {"Edit"}
                id={item._id}
                onClick={() => navigate(`/menu/${item._id}`)}
                />
                </div>))}
                    
                </div>
            </div>

    </div>
  )
}
