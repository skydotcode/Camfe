import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const DialogBox = ({isAgree}) => {
  const [open, setOpen] = React.useState(isAgree);
  const [selectedValue, setSelectedValue] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
    isAgree = event.currentTarget.value;
    // setSelectedValue(event.currentTarget.value);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please only proceed if you are a Student or a Professor!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button value={false}
           onClick={handleClose} autoFocus>
            Back
          </Button>
          <Button value={true}
          onClick={handleClose}>Proceed</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

