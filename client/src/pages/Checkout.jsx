import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '#src/context/AuthContext.jsx';
import { CartFooter } from '#src/components/CartFooter.jsx';
import api from '../config/axios.js'

const locations = [
  { id: 1, name: 'Block 4' },
  { id: 2, name: 'Block 5' },
  { id: 3, name: 'APJ' },
//   { id: 4, name: 'NSUT Safal' },
];


const Checkout = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
  const { login, user } = useAuth();
  const navigate = useNavigate();

    const [location , setLocation] = useState('');
    const [phone , setPhone] = useState('');
    const [address , setAddress] = useState('');
    const [error , setError ] = useState({});

    const [formData, setFormData] = useState({
        phone : "" , 
        address : "" ,
        // password : "" ,
    });

    const handleChange= (e)=>{
        setFormData({ ...formData , [e.target.name]:e.target.value})
        // setRole(event.target.value);
        setError({ ...error, [e.target.name]: '' });
    }

    const validate = () =>{
        let newErrors = {};
        if(!formData.phone) newErrors.phone = "phone number is required" 
        // else if(!(formData.phone.length >10)) newErrors.address = "enter valid email"
        
        // else if(!name) newErrors.email = "enter valid name"
        
        if(!formData.address) newErrors.address = "address is required" 
        // else if(!(formData.address.trim(" ").length<0)) newErrors.address = "enter valid email"

        // if(!formData.password) newErrors.password = "Password is required"
        // else if(formData.password.length < 6) newErrors.password = "minimum 6 characters required"

        return newErrors;

    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        let newErrors = validate();
        if(Object.keys(newErrors).length > 0){
            setError(newErrors);
            return;
        }

        let customer ={
            name:user?.name ,
            phone:formData.phone,
        };
        
        try{
            const token = localStorage.getItem('token');
            const res = await api.post('/api/orders', {
                phone: formData.phone,
                customer:customer,
                deliveryLocation: [formData.address , location],
                cart:cart
            } , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(res.data.message);
            clearCart();
            navigate("/orders/my");            

        }catch(e){
            const message = e.response?.data?.error || 'Something went wrong';
            toast.error(message);
        }
    }

    const handleLocationChange=(e)=>{
        try {
            const location = e.target.value ;
            setLocation(location);  
        } catch (error) {
            let newErrors = {};
            newErrors.location(error)
            
        }
    }
  if (cart.length === 0) {
    return (
      <div className='flex flex-col h-screen bg-[#faf8f3]'>
        <CartFooter/>
        <div className='flex flex-col justify-center items-center h-screen gap-4'>
          <h1 className=''>Your cart is empty!</h1>
          <button onClick={() => navigate('/')} className='bg-[#fe6a36] text-white p-4 
          w-60 rounded-lg font-bold '>Browse Menu</button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col bg-[#faf8f3] gap-8 h-screen '>
        <CartFooter/>
        <div className='flex flex-col gap-4  lg:px-24 min-h-screen mx-4 '>
            <div className='flex flex-col gap-4 bg-white p-4 px-8  gap-4 shadow-xl  rounded-xl'>
                <p className='font-bold text-2xl'>Enter Delivery Location Details</p>
        {/* {cart.map(item => ( */}
                <form className='flex flex-col gap-4 bg-white gap-4' 
                onSubmit={handleSubmit} id="myForm">
                    <label htmlFor="phone">Enter Your Contact Number</label>
                    <input placeholder='+91 XXXXX XXXXX'  name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} type='tel' maxLength="10"
                    className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                    {error.phone && <p className='text-red-500 text-xs'>{error.phone}</p>}

                    <div className="relative w-64 ">
                        <select
                            value={location}
                            onChange={handleLocationChange}
                            className="
                            w-full
                            px-4 py-2
                            bg-white
                            border-2 border-[#fe6a36]
                            rounded-lg
                            text-gray-700
                            font-medium
                            cursor-pointer
                            outline-none
                            appearance-none
                            focus:border-orange-600
                            focus:ring-2 focus:ring-orange-300
                            transition-all duration-200
                            
                            "
                        >
                            <option value="" disabled>Select the Location</option>
                            {locations.map(location => (
                            <option key={location.id} value={location.name}>
                                {location.name}
                            </option>
                            ))}
                            {/* <option value="" >Student Center</option>
                            <option  >Safal</option>
                            <option  >NesCafe</option>
                            <option  >Mother Dairy</option> */}
                        </select>

                    {/* custom dropdown arrow */}
                        <div className="absolute right-3 top-3 pointer-events-none text-orange-500">
                            ▼
                        </div>
                        
                    </div>{error.location && <p style={{ color: 'red' }}>{error.location}</p>}

                    <label htmlFor="phone">Enter Your Address</label>
                    <input placeholder='Room no. 312'  name="address" 
                    value={formData.address} 
                    onChange={handleChange} type='text'
                    className='px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fe6a36]'></input>
                    {error.address && <p className='text-red-500 text-xs'>{error.address}</p>}
                </form>
            </div>
            
            {/* ))} */}
          <div>
                            
        </div>
        <div className='flex flex-col  shadow-xl  rounded-xl bg-white p-4 gap-4 '>
            <h2 className='px-4 font-bold text-2xl'> Order Summary</h2>
            <div className='flex justify-between px-4 '>
            <span>Subtotal</span>
            <p>₹{totalPrice}</p>
            </div>
            <div className='flex justify-between px-4 '>
            <span>Delivery</span>
            <p>₹10</p>
            </div>
            <hr className='opacity-50'></hr>
            <div className='flex justify-between px-4 '>
            <span>Total</span>
            <p className='text-[#fe6a36] text-xl'>₹{totalPrice+10}</p>
            </div>
        </div>
      </div>

      {/* <h2>Total: ₹{totalPrice}</h2> */}
      <div className='flex bottom-0 w-full fixed p-4 flex justify-center items-cneter bg-white shadow-md' >
        <hr className='opacity-50'></hr>
        <button className='bg-[#fe6a36] text-white rounded-2xl p-3  px-12 
        text-2xl cursor-pointer'
        type="submit" form="myForm" >Place Order : ₹{totalPrice+10}</button>
      </div>
    </div>
  );
};

export default Checkout;