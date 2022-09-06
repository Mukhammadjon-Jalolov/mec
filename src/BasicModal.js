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
  const [filled, fillForm] = React.useState({city: "not specified", address: "not specified", housenumber: "not specified", color: " ", rooms: "not specified"});
  const [textColorStyle, changeTextColor] = React.useState({backgroundColor: "#fff"});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const detectChanges = (data, e) => {
    let newObj = filled;

    if(data === "color"){
      newObj.color = e.hex;

      changeTextColor({backgroundColor: e.hex})
      //this.setState({backgrcolorStyle: {backgroundColor: e.hex} });
    } else {
      newObj[data] = e.target.value
    }

    //newObj[data] = e.target.value;
    fillForm(newObj)
  };

  const saveAndClose = (filled) => {
    saveChild(filled);
    setOpen(false);
  }

  return (
    <div className='addnew'>
      <Button variant="contained" onClick={handleClickOpen}>
        Add new variable
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new variable </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the form about houses. Save it to the database
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
            <br/>
            <div className="pickColor" style = {textColorStyle}> Selected color </div>
            <div className="paletteContainer">
              <CirclePicker onChangeComplete = { (e) => {detectChanges("color", e)} } />
            </div>
            
            <TextField
                id="standard-helperText"
                placeholder="Number of rooms"
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
