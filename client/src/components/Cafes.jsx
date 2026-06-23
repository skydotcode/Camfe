import React, { useEffect, useState } from 'react'
import { Cafecard } from './Cafecard'
import { useNavigate } from 'react-router-dom';
import api from '../config/axios.js'
import { Loading } from './ui/Loading';
import { useAuth } from '#src/context/AuthContext.jsx';
import { toast } from 'react-toastify';


export const Cafes = ({cafeListing}) => {
  const navigate = useNavigate();
  const {loading} = useAuth();
  const [cafes, setCafes] = useState([]);

  useEffect(() => {
    const fetchCafe = async () =>{
      try{
        let res = await api.get(`/api/cafe`);
        setCafes(res?.data);
        console.log(res?.data);
      }catch(err){
        toast.error(err);
      }
    };
    fetchCafe();
  }, []);

  console.log(cafes);


  if(loading) return <Loading/> ;
  
  return (
    <div>
      <p className='text-2xl'>Popular Cafes</p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 mb-8'>
          {(cafes?.length !==0) && (cafeListing!= 0) ? (cafeListing || cafes)?.map((cafe) => (
            <Cafecard key={cafe._id} cafe={cafe} />
          )) : <p className='flex justify-center font-bold
                    text-xsm text-[#fe6a36]'>No Results :( </p>
        }
        </div>
    </div>
    
  )
}
