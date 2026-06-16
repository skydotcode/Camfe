import { Loading } from '../components/ui/Loading.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/axios.js'
import { useAuth } from '../context/AuthContext.jsx';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { login , loading} = useAuth();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      localStorage.setItem('token', token);
      login(token);
      navigate('/');
      toast.success("LogIn Successful :)");
      
    } else {
      navigate('/login');
      toast.error("something went wrong :(") // something went wrong
    }
  }, []);

  if(loading) return <Loading/> ;
  return <div ><Loading/></div>;
};

export default AuthSuccess;