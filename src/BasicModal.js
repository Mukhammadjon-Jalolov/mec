import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { CirclePicker } from 'react-color';


export default function FormDialog({data, saveChild}) {
  const [open, setOpen] = React.useState(false);
  const [filled, fillForm] = React.useState({city: " ", address: " ", housenumber: " ", color: " ", rooms: " ", image: " "});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const detectChanges = (data, e) => {
    let newObj = filled;
    newObj[data] = e.target.value;
    fillForm(newObj)
  };

  const saveAndClose = (filled) => {
    saveChild(filled);
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new variable </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here you can fill the form and save it to create a new variable. Save it to the database for later use
          </DialogContentText>

          <br/>
            <TextField
                id="standard-helperText"
                variant="standard"
                placeholder="Add city"
                autoComplete='off'
                onChange={(e) => {detectChanges("city", e)}}
            />
            <br/>
            <TextField
                id="standard-helperText"
                placeholder="Add address"
                variant="standard"
                autoComplete='off'
                onChange={(e) => {detectChanges("address", e)}}
        		/>
            <br/>
            <TextField
                id="standard-helperText"
                placeholder="House number"
                variant="standard"
                autoComplete='off'
                onChange={(e) => {detectChanges("housenumber", e)}}
        		/>
            <br/>
            <TextField
                id="standard-helperText"
                placeholder="Color"
                variant="standard"
                onChange={(e) => {detectChanges("color", e)}}
        		/>
            <br/>
            <TextField
                id="standard-helperText"
                placeholder="Rooms"
                variant="standard"
                autoComplete='off'
                onChange={(e) => {detectChanges("rooms", e)}}
        		/>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => {saveAndClose(filled)}}>Save </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
