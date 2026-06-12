import React from 'react';
import api from '../config/axios.js'

export const Footer = () => {
  return (
    <div className="footer flex flex-col justify-center 
    items-center bg-white p-2 border-t-1 border-gray-500/50 shadow-md
    ">
        <div className="f-info-socials">
            <i className="fa-brands fa-square-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-linkedin"></i>

        </div>
        <div> Campus Eats Pvt. Ltd.</div>
        <div className="f-info-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
        </div>
    </div>
  )
}
