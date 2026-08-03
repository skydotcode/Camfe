import React from 'react'

export const AboutPage = () => {
  return (
    <div>
        <div className='lg:flex md:flex lg:flex-row  md:flex-row bg-white rounded-3xl p-4'>
            <div className=''>
                <p className='text-4xl font-bold mb-2'>Raj Kumar Yadav</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, veritatis consequatur adipisci eius accusamus doloribus modi quaerat dolorem autem quisquam quis animi voluptates non officiis inventore et quidem officia tempora.</p>
                <div className='md:my-8'>
                    <p>Address : Cafe Santosh , NSUT , Delhi</p>
                    <p>Phone No: 8998899889</p>
                    
                </div>
            </div>
            <div className='flex justify-center my-4'>
                <iframe className='rounded-3xl shadow-md lg:w-100 lg:h-100 md:w-100 md:h-100 h-50' 
                
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBVizdQeh3udy11xDc5Ao2YStR2gLc-rfc&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;maptype=roadmap&amp;zoom=14">
                    <a href="https://www.maps.ie/create-google-map/">Embed directions map</a>
                </iframe>
            </div>
            
        </div>
        
    </div>
  )
}
