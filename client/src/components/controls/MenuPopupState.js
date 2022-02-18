import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import axios from 'axios';
import { Box, IconButton, Typography } from '@mui/material';
import Popup from '../Popup';

export default function MenuPopupState({state, setState, id}) {

    const [deleteData, setDeleteData] = React.useState('')
    // const [action, setAction] = React.useState(false)
    const [openPopup, setOpenPopup] = React.useState(false)
    React.useEffect(() => {
        const deleteItem = async (deleteData) => {
          try {
            if(deleteData !== '') {
              const result = await axios.delete(`/api/patient/${deleteData}`)
              console.log(result.data)
              setState({ open: true });
            }
          } catch (error) {
            console.log(error)
          }
        }
        deleteItem(deleteData);
        
      }, [deleteData, state.open]);
    const handleTriger = () => {
        setDeleteData(id)
        // setDeleteData('')
    }
    // console.log(deleteData)
    // console.log(state)
  return (
    <>
    <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} btnName="Continue" title='Warning!'>
      <Box>
      <Typography>
        Deleting patient will erase all its exam?
      </Typography>
      </Box>
    </Popup>
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
            <IconButton variant="contained" {...bindTrigger(popupState)}>
          <MoreVertIcon>
          </MoreVertIcon>
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close }>Edit</MenuItem>
            <MenuItem onClick={() => setOpenPopup(true)}>Delete</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
    </>
  );
}
