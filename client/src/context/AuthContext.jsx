import { useEffect } from 'react';
import { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../config/axios.js'
import { Loading } from '#src/components/ui/Loading.jsx';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [cafe, setCafe] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!token) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const res = await api.get(`/auth/me`, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       });
  //       setUser(res.data.user);
  //       setCafe(res.data.cafe);
  //       // store user in context
  //     } catch (err) {
  //       toast.error(err);
  //       // token is invalid or expired
  //       localStorage.removeItem('token');
  //       setToken(null);
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [token]);

  // if (loading) return <Loading/>;

  // const login = (token,userData , cafeData) => {
  //   localStorage.setItem('token', token);  // save token to browser storage
  //   setToken(token);
  //   setUser(userData);  
  //   setCafe(cafeData ?? null);
  // };

  const fetchUser = async (currentToken) => {
    if (!currentToken) {
        setUser(null);
        setCafe(null);
        setLoading(false);
        return;
    }
    try {
        const res = await api.get(`/auth/me`, {
            headers: { Authorization: `Bearer ${currentToken}` }
        });
        setUser(res.data.user);
        setCafe(res.data.cafe);
    } catch (err) {
        toast.error(err);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setCafe(null);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchUser(token);
}, [token]);

const refreshUser = () => fetchUser(token);

const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken); // triggers the useEffect above, which refetches everything
};

  const logout = () => {
    localStorage.removeItem('token');  // remove token
    setToken(null);
    setUser(null);
    localStorage.setItem('selectedCafeId', null);
    toast.success("Logged Out Successfully");
  };

  // isLoggedIn is true if token exists
  const isLoggedIn = !!token;  // !! converts to boolean

  return (
    <AuthContext.Provider value={{ token,user,cafe, login, logout, refreshUser, isLoggedIn ,loading}}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook — makes it easy to use auth in any component
export const useAuth = () => useContext(AuthContext);