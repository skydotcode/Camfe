import React from 'react'
import { OrbitProgress } from "react-loading-indicators";

export const Loading = () => {
  return (
    <div className='flex justify-center items-center'>
        <OrbitProgress color="#fe6a37" size="small"
        speedPlus={1} text="" textColor="#NaNNaNNaN" />
    </div>
  )
}
