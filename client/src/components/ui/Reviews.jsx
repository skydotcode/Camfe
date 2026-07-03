import React from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';

export const Reviews = ({review}) => {
  return (
    <div className='flex flex-row bg-white my-4 rounded-2xl shadow-sm p-4 max-w-md gap-2' >
         <Avatar />
        <div>
          <p>{review?.user?.name}</p>
          <Rating name="read-only" value={review?.rating} readOnly />
          <p>{review?.review}</p>
        </div> 
    </div>
  )
}
