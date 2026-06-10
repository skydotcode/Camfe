import React, { useEffect, useState } from 'react'
import { Cafecard } from './Cafecard'
import cafe1 from "../images/cafe1.jpg"
import cafe2 from "../images/cafe2.jpg"
import cafe3 from "../images/cafe3.jpg"
import { useNavigate } from 'react-router-dom'

export const Cafes = () => {
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect running");
    fetch('/api/cafes')
      .then(res => {
        console.log("Response received:", res.json); 
        return res.json(cafes)})
      .then(data => {
        console.log("Cafes:", data);
        setCafes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
   
  return (
    <div className='flex flex-col gap-4  pt-4 mb-8 '> 
        <p className='text-2xl'>Popular Cafes</p>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4
          overflow-x-scroll'>
            {cafes.map(item => (
            <div key={item._id} onClick={()=> navigate(`/cafes/${item._id}`) }>
              <Cafecard
              
              image={item.image}
              name={item.name}
              // price={item.price}
              rating='4.7'
              deliveryTime='20-25'
              
              text2 = "+ Add to Cart"
              
              />
            </div>))}
        </div>
    </div>
  )
}
