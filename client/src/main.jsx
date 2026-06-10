import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
)
