import React from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useAuth } from '#src/context/AuthContext.jsx';

export const Reviews = ({review , handleReviewChange , handleRatingChange , onSendData}) => {
  const { user , refreshUser} = useAuth();

  const editReview = (review) =>{
    onSendData(review);
  }

  return (
    <div className='flex justify-between bg-white my-4 rounded-2xl shadow-sm p-4 max-w-md '>
      <div className='flex flex-row gap-2' >
          <Avatar />
          <div>
            <p>{review?.user?.name}</p>
            <Rating name="read-only" value={review?.rating} readOnly />
            <p>{review?.review}</p>
          </div> 
          
      </div>
      { user?._id == review?.user._id &&
      <div onClick={()=> editReview(review)}>
        <p><i className="fa-solid fa-pen-to-square"></i></p>
      </div>
      }
      
    </div>
  )
}
