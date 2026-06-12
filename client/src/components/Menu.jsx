import React from 'react';
import api from '../config/axios.js'

export const Menu = ({ image, name, category, rating, deliveryTime }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
      {/* {foodItems.map(item => (
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
          
        </div>))} */}
    </div>

  )
}
