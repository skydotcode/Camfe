import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../config/axios.js'

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;