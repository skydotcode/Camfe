import React from 'react'
import { useEffect, useState } from 'react'
import { Foodcard } from './Foodcard'
// import { useNavigate } from 'react-router-dom'

export const Fooditems = () => {
  
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    console.log("useEffect running");
    fetch('/api/fooditems',{
      headers: {
          Authorization: `Bearer ${token}`
      }})
      .then(res => {
        console.log("Response received:", res.json); 
        return res.json(foodItems)})
      .then(data => {
        console.log("Food items:", data);
        setFoodItems(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex flex-col  gap-4  mt-8 mb-8'>
        <p className='text-2xl'>Trending Food Items</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
            {foodItems.map(item => (
              <div>
              <Foodcard
            key={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            rating='4.7'
            deliveryTime='20-25'
            
            text2 = "+ Add to Cart"
            />
            
        </div>))}
        </div>

    </div>
  )
}
