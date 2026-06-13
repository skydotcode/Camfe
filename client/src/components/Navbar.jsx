import React, { useState } from 'react'
import logo from "../images/LogoIcon.jpeg"
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button"
import { Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import api from '../config/axios.js'


export const Navbar = () => {
  const { user, isLoggedIn, logout, loading } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  if (loading) return <p>Loading...</p>;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  console.log("user?.role",user._id);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex flex-row justify-between w-full py-4  items-center px-4 lg:px-24 
    border-b border-gray-500/50 bg-white'>
      
      {/* Logo */}
      <div className='flex flex-row items-center gap-4 cursor-pointer' onClick={() => navigate("/")}>
        <img src={logo} className='rounded-full object-cover h-10' />
        <h1 className='text-xl font-bold'>Camfè</h1>
      </div>
      <div className='flex justify-center items-center gap-4'>

      {isLoggedIn ? (
        <div className='flex items-center gap-4 lg:gap-6'>

          {/* Cart icon — only for non cafe owners */}
          {(user===null || user?.role === "Student" || user?.role === "Teacher")  && (
            <IconButton onClick={() => navigate('/cart')}>
              <Badge badgeContent={totalItems} color="primary" overlap="circular">
                <ShoppingCartIcon fontSize="small" />
              </Badge>
            </IconButton>
          )}

          {/* Account menu — MUI handles its own positioning, no absolute wrapper needed */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  <i className="fa-regular fa-user" />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={()=> {handleClose(); navigate("orders/my")}}>
              <Avatar /> My Orders
            </MenuItem>
            { user?.role === "Cafe Owner" &&
            <MenuItem onClick={()=> {handleClose(); navigate(`/cafe/${user?._id}`)}}>
              <ListItemIcon><i class="fa-solid fa-shop"></i></ListItemIcon>
              My Cafes
            </MenuItem>}
            <Divider />
            
            { user?.role === "Cafe Owner" &&
            <MenuItem onClick={()=> {handleClose(); navigate("/cafe/register")}}>
              <ListItemIcon><PersonAdd fontSize="small" className='text-green-500'/></ListItemIcon>
              Add another cafe
            </MenuItem>}
            <MenuItem onClick={handleClose}>
              <ListItemIcon><Settings fontSize="small" className='text-blue-500' /></ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={() => { handleClose(); logout(); }} className='text-red-500'>
              <ListItemIcon><Logout fontSize="small" className='text-red-500' /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

        </div>
      ) : (
        <p className='cursor-pointer flex' onClick={() => navigate("/login")}>Login</p>
      )}
      </div>

    </div>
  )
}