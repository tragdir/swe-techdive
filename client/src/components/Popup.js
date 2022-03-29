import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { Dialog, DialogTitle, DialogContent, Typography, Divider } from '@mui/material';
import { Button } from '@mui/material';

const Popup = props => {
  const { title, children, openPopup, setOpenPopup } = props;
  const handleClose = () => {
    setOpenPopup(false);
  };
  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography sx={{ marginTop: '10px' }}>{title}</Typography>
        <Button color="error" onClick={handleClose}>
          <CloseIcon />
        </Button>
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default Popup;
