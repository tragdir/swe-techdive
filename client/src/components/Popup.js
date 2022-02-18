import React from 'react'

import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Button } from '@mui/material';

const Popup = (props) => {

    const {title, children, openPopup, setOpenPopup, btnName} = props;
    const handleClose = () => {
      setOpenPopup(false);
    };
  return (
    <Dialog open={openPopup} onClose={handleClose}>
        <DialogTitle>
       <Typography>
         {title}
       </Typography>
        </DialogTitle>
        <DialogContent>
          { children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} autoFocus>
           {btnName}
          </Button>
        </DialogActions>
    </Dialog>
  )
}

export default Popup