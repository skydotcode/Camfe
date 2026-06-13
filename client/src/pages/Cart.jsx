import { CartFooter } from '#src/components/CartFooter.jsx';
import { OrderSummary } from '#src/components/OrderSummary.jsx';
import { useAuth } from '#src/context/AuthContext.jsx';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../config/axios.js'


const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, clearCart } = useCart();
  const {isLoggedIn , loading} = useAuth() ;
  const navigate = useNavigate();

  if(loading) return <p>Loading..</p>

  if (cart?.length === 0) {
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
    <div className='flex flex-col bg-[#faf8f3] gap-8 min-h-screen '>
      <CartFooter/>
      <div className='flex flex-col gap-8  lg:px-24 px-4'>
      {cart.map(item => (
        <div key={item._id} className='flex flex-col bg-[#faf8f3]     gap-4 '>
            <div className='flex bg-white rounded-xl p-4 shadow-md gap-4 justify-center items-center'>
                <div>
                    <img src={item.image} alt={item.name} width="300" className='rounded-xl'/>
                </div>
                <div className='flex flex-col gap-2 w-full  items-start'>
                    <h2 className='font-bold text-2xl'>{item.name}</h2>
                    <div className='w-full  flex justify-between items-center'>
                        <p className='text-xl'>₹{item.price}</p>
                        <div className='bg-[#f6f1e8] px-6 py-2  flex rounded-3xl gap-2 items-center justify-between'>
                            <button onClick={() => decreaseQuantity(item._id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item._id)}>+</button>
                        </div>
                        
                    </div>
                    <p className='text-'>Subtotal: ₹{item.price * item.quantity}</p>
                    <button >Remove <i className="fa-solid fa-trash-can text-red-500"
                    onClick={() => removeFromCart(item._id)}></i></button>
                </div>
            </div>

          {/* quantity controls */}
          

          {/* subtotal for this item */}


        </div>
      ))}
      <div className='flex flex-col  shadow-xl  rounded-xl bg-white p-4 gap-4  mb-32'>
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
      <OrderSummary onclick={()=> isLoggedIn? navigate("/orders"):navigate("/login")}/>
    </div>
  );
};

export default Cart;