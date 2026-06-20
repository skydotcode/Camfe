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
import AuthSuccess from './pages/AuthSuccess';
import api from './config/axios.js'
import { useAuth } from './context/AuthContext'

// import './App.css'

function App() {
  const {user , loading , isLoggedIn} = useAuth();

  const ProtectedRoute = ({children}) =>{
    if(user === undefined){
      return <div>Loading...</div>
    }
    if(!loading && !isLoggedIn ){
      return < Navigate to='/login'/>
    }
    return children;
  }
  return(
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
        <Route path="/auth/success" element={<AuthSuccess/>} />
        <Route path="/:id/menu" element={<ProtectedRoute><New /></ProtectedRoute>} />
        <Route path="/:id/cafe" element={<ProtectedRoute><Ownerhomepage /></ProtectedRoute>} />
        <Route path="/menu/:id" element={<ProtectedRoute><EditFood /></ProtectedRoute>} />
        <Route path="/cafe/new" element={<ProtectedRoute><CafeRegister /></ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/orders/my" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
        <Route path="/cafe/:id" element={<Cafehome/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
