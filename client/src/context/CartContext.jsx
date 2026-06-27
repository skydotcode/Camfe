import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/axios.js'
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  // initialize cart from localStorage
  // so cart persists even after page refresh
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    // if cart exists in localStorage parse it, otherwise start with empty array
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // whenever cart changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);  // ← runs every time cart state changes

  const getCafeId = (item) => item.cafeId || item.cafe;

  // ADD TO CART
  const addToCart = (item) => {
    setCart(prev => {
      if (prev.length > 0 && getCafeId(prev[0]) !== getCafeId(item)) {
        toast.error('You can only order from one cafe at a time. Clear your cart to order from a different cafe.');
        return prev; // unchanged
      }
      // check if item already exists in cart
      const exists = prev.find(cartItem => cartItem._id === item._id);

      if (exists) {
        toast.success(`${item.name} added to cart!`);

        // item already in cart — just increase quantity
        return prev.map(cartItem =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      toast.success(`${item.name} added to cart!`);

      // item not in cart — add it with quantity 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // REMOVE FROM CART
  const removeFromCart = (itemId) => {
    // filter out the item with matching id
    setCart(prev => prev.filter(cartItem => cartItem._id !== itemId));
  };

  // INCREASE QUANTITY
  const increaseQuantity = (itemId) => {
    setCart(prev =>
      prev.map(cartItem =>
        cartItem._id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (itemId) => {
    setCart(prev =>
      prev.map(cartItem =>
        cartItem._id === itemId && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ).filter(cartItem => cartItem.quantity > 0)  // remove if quantity reaches 0
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // TOTAL PRICE
  // reduce goes through each item and adds up price * quantity
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);  // 0 is the starting value

  // TOTAL ITEMS COUNT — for cart badge
  const totalItems = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      totalPrice,
      totalItems,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);