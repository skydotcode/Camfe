import React from 'react'

export const QuickCravings = () => {
  return (
    <div className='my-4'>
        <p className='text-xl font-bold'>What's on your Mind?</p>
        <div className='flex flex-row gap-4 overflow-auto'>
            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Coffee.png'
                
                /></button>
            </div>
            

            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/North%20Indian.png'/></button>
            </div>

            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Burger.png'/></button>
            </div>
            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pizza.png'/></button>
            </div>
            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Dosa.png'/></button>
            </div>
            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Paratha.png'/></button>
            </div>
            <div>
                <button className='w-25 '><img
                src='https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/PC_Mweb/Pastry.png'/></button>
            </div>
            
        </div>
    </div>
  )
}
