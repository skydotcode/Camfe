import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MenuCard } from '../MenuCard';
import api from '../../config/axios.js'
import { useAuth } from '#src/context/AuthContext.jsx';
import { Loading } from '../ui/Loading';



export const MenuManagement = ({cafe }) => {     
  const navigate = useNavigate();
  const {loading} = useAuth();
  const [error, setError] = useState(null);

  if(loading) return <Loading/>

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
            <div  
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {(cafe?.length !== 0 ) ? cafe?.menu.map((item) => (
                  <MenuCard
                  key={item._id}
                  item = {item}
                  text1={"Edit"}
                  />  
                  )) : <p className='flex justify-center font-bold
                        text-xsm text-[#fe6a36]'>No Menu :( </p>}
            </div>   
            </div>
        </div>
  )
}
