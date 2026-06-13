import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Homepage } from './pages/Homepage'
import { Cafehome } from './pages/ShowCafe'
import { Ownerhomepage } from './pages/cafeOwner/Ownerhomepage'
import {New} from "./pages/cafeOwner/New"

import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom";
import { useEffect } from 'react'
import EditFood from './pages/cafeOwner/EditFood'
import { NotFound } from './pages/NotFound'
import { ToastContainer } from 'react-toastify';
import { CafeRegister } from './pages/CafeRegister'
import Cart from './pages/Cart'
import ScrollToTop from './components/ScrollToTop'
import Checkout from './pages/Checkout'
import { MyOrders } from './pages/MyOrders'
import api from './config/axios.js'

// import './App.css'

function App() {
  console.log(import.meta.env.VITE_API_URL);

  return (
    <BrowserRouter>
    <ScrollToTop /> 
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      // transition={Bounce}
      />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Checkout />} />
        <Route path="/orders/my" element={<MyOrders />} />
        <Route path="/:id/menu" element={<New />} />
        <Route path="/cafes/:id" element={<Cafehome/>}/>
        <Route path="/cafe/:id" element={<Ownerhomepage/>}/>
        <Route path="/menu/:id" element={<EditFood />} />
        <Route path="/cafe/register" element={<CafeRegister/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
