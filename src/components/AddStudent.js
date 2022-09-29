import React, { Component } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';


class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, email: "", name: "", message:" "};
      };


    handleClickOpen = () => {
        this.setState( {open:true} );
      };
  
    handleClose = () => {
        this.setState( {open:false} );
      };
  
    handlEmailChange = (event) => {
        this.setState({email: event.target.value});
    }
    handlNameChange =(event)=>{
      this.setState({name: event.target.value});
    }

      // Save student and close modal form

    handleAdd = () => {
      fetch("http://localhost:8080/student", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.state.email, 
              name: this.state.name,               
            }),
          })
            .then((response) => response.json())
            .then((responseData) => {
              if(responseData.email !== undefined){
                toast.success("Student successfully added", {
                  position: toast.POSITION.BOTTOM_LEFT
                });            
                this.setState({
                  email: responseData.email,
                  name: responseData.name,
                })
              }else{
                toast.error("emailID is already exists.", {
                  position: toast.POSITION.BOTTOM_LEFT
                });
              }
            })
            .catch((err) => console.error(err));   
      this.handleClose();
     }

    render()  { 
        return (
            <div>              
              <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                Add Student
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                  <DialogTitle>Add Student</DialogTitle>
                  <DialogContent  style={{paddingTop: 20}} >
                    <TextField autoFocus fullWidth label="Email" name="email" onChange={this.handlEmailChange}  /> 
                    <TextField autoFocus fullWidth label="Name" name="name" onChange={this.handlNameChange}  />
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                    <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                  </DialogActions>
                </Dialog> 
                <ToastContainer autoClose={1500} />   
            </div>
        ); 
      }
}

export default AddStudent;