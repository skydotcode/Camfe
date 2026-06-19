import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const GoogleLoginButton = () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center gap-3 border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <img src="https://docs.material-tailwind.com/icons/google.svg"
          alt="google" className="h-6 w-6" />
        Continue with Google
      </button>

      <Dialog 
      open={open} onClose={() => setOpen(false)}
      PaperProps={{
        style: { backgroundColor: '#faf8f3' }  // ← dialog background
        }}>
        <DialogTitle>Sign in with Google</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please only proceed if you are a Student or a Professor from NSUT!
            <br></br>
            Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
          style={{ color: 'black' }}  
          onClick={() => setOpen(false)} color="error">Cancel</Button>
          <Button 
           style={{ backgroundColor: '#fe6a37' , border:"none"}} 
          onClick={handleConfirm} variant="contained" autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};