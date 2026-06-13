import axios from 'axios';
// import { error } from 'console';
import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../config/axios.js'

// context lets you share auth state across all components
// without passing props down manually
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // check if token exists in localStorage on app load
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);

    // fetch current user info when app loads
  // runs whenever token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // hit a /me endpoint that returns current user info
        const res = await api.get(`/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setCafe(res.data.cafe);
        // store user in context
      } catch (err) {
        toast.error(err);
        // token is invalid or expired
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const login = (token,userData) => {
    localStorage.setItem('token', token);  // save token to browser storage
    setToken(token);
    setUser(userData);  
  };

  // const getUser = () =>{
  //   return user;
  // }

  const logout = () => {
    localStorage.removeItem('token');  // remove token
    setToken(null);
    setUser(null);
    toast.success("Logged Out Successfully");
  };

  // isLoggedIn is true if token exists
  const isLoggedIn = !!token;  // !! converts to boolean

  return (
    <AuthContext.Provider value={{ token,user,cafe, login, logout, isLoggedIn ,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook — makes it easy to use auth in any component
export const useAuth = () => useContext(AuthContext);