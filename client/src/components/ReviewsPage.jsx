import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { toast } from 'react-toastify';
import api from '../config/axios.js'
import { useNavigate, useParams } from 'react-router-dom';
import { Reviews } from './ui/Reviews.jsx';
import { AuthProvider, useAuth } from '#src/context/AuthContext.jsx';

const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent',
};

export const ReviewsPage = ({cafe}) => {
    const navigate = useNavigate();
    const { user , refreshUser} = useAuth();
    const [rating, setRating] = useState(null);
    const [review, setReview] = useState("");
    const [isEdit , setIsEdit] = useState(null);
    const [reviews , setReviews] = useState();
    const [hover, setHover] = useState(-1);
    const [error, setError] = useState({});

    console.log(user);

    const validate = () => {
        const newErrors = {};
        if (!rating) newErrors.rating = "Rating is required";
        if (!review.trim()) newErrors.review = "Review is required";
        return newErrors;
    };

    const handleRatingChange = (e, newValue) => {
        setRating(newValue);
    };

    const handleChildData = (review) =>{
        setRating(review?.rating);
        setReview(review?.review);
        setIsEdit(review);
    };

    console.log(isEdit);

    const handleReviewChange = (e ) => {
        setReview(e.target.value );
    };

    const getReviews = async () => {
        try {
            let res = await api.get(`/api/cafe/${cafe?._id}/reviews`);
            console.log(res.data.data);
            setReviews(res.data.data);           
        } catch (err) {
            toast.error(err.message);
        }
    };

    useEffect(() => {

        getReviews();
    }, [cafe?._id]);


    


    const handleSubmit=async (e)=>{
        e.preventDefault();
        let newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setError(newErrors);
            return;
        }

        if(isEdit != null){
            const token = localStorage.getItem('token');
            let res =  await toast.promise( 
                api.put(`/api/reviews/${isEdit?._id}`, 
                    { 
                        rating, review , 
                        cafeId:cafe._id,
                        user : user,
                    },
                    {
                    headers: {
                        Authorization: `Bearer ${token}`}
                }) , {    
                pending: ' Validating your review...',
                success: '✅ Review Updated!',
                error: {
                    render({ data }) {
                        return data?.response?.data?.errors?.[0] 
                            || data?.response?.data?.error 
                            || 'Something went wrong?';
                    }
                }
                });
                await getReviews(); 
                setRating(0);
                setReview('');
                setIsEdit(null);
                // handleChildData(res?.data?.data);
            
        }else{
            const token = localStorage.getItem('token');
            let res =  await toast.promise( 
                api.post(`/api/reviews/new`, 
                    { 
                        rating, review , 
                        cafeId:cafe._id,
                        user : user,
                    },{
                    headers: {
                        Authorization: `Bearer ${token}`}
                }) , {    
                pending: ' Validating your review...',
                success: '✅ Review added!',
                error: {
                    render({ data }) {
                        return data?.response?.data?.errors?.[0] 
                            || data?.response?.data?.error 
                            || 'Something went wrong?';
                    }
                }
                });
                await getReviews(); 
                setRating(0);
                setIsEdit(null);
                setReview('');
            }
        };

    // if(loading) return <Loading/>



  return (
    <div>
        <div className='bg-white rounded-2xl shadow-sm p-4 max-w-md ' >
            <p className='text-2xl font-semibold'>Leave a Review for </p>
            <p className='text-2xl font-light mb-1'>{cafe?.name}</p>

            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <div>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={handleRatingChange}
                        onChangeActive={(e, newHover) => setHover(newHover)}
                        emptyIcon={<StarIcon style={{ opacity: 0.4 ,}} fontSize="inherit" 
                        />}
                        size="large"
                    />
                    {(hover !== -1 || rating !== null) && (
                        <p className='text-sm text-gray-500 mt-1'>
                            {labels[hover !== -1 ? hover : rating]}
                        </p>
                    )}
                    {error.rating && <p className='text-red-500 text-xs mt-1'>{error.rating}</p>}
                </div>

                <div>
                    <textarea
                        placeholder='Write Your Experience...'
                        name="review"
                        value={review}
                        onChange={handleReviewChange}
                        className='w-full px-4 py-2 focus:outline-none rounded-xl border h-32 resize-none focus:ring-2 focus:ring-[#fe6a36]'
                    />
                    {error.review && <p className='text-red-500 text-xs mt-1'>{error.review}</p>}
                </div>

                <button
                    type="submit"
                    className='self-end bg-[#fe6a36] text-white rounded-2xl px-6 py-2 text-sm cursor-pointer hover:bg-[#e85a28] transition-colors'
                >
                    Submit
                </button>
            </form>
        </div>
        <div>
            {(reviews?.length !== 0 ) ? reviews?.map(item => (
                <div key={item._id}>
                    <Reviews review={item}
                    onSendData={handleChildData}
                    />
                </div>)) : <p className='flex justify-center font-bold my-4
                text-2xl text-[#fe6a36]'>No Reviews !</p>}
        </div>
    </div>
  );
}

