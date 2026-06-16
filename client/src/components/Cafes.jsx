import React, { useEffect, useState } from 'react'
import { Cafecard } from './Cafecard'
import { useNavigate } from 'react-router-dom';
import api from '../config/axios.js'
import { Loading } from './ui/Loading';


export const Cafes = () => {
  const navigate = useNavigate();
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("useEffect running");
    api.get(`/api/cafe`)
      .then(data => {
        setCafes(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if(loading) return <Loading/>
  
   
  return (
    <div className='flex flex-col gap-4  pt-4 mb-8 '> 
        <p className='text-2xl'>Popular Cafes</p>
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4
          overflow-x-scroll'>
            {cafes?.data?.map(item => (
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
