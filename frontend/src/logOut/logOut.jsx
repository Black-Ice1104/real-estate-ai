import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function LogOutComponent() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
    const handleLogOut = () => {
        localStorage.removeItem('token');
        setOpen(true);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom:'5vh'}}>
            <Button variant="outlined" color="primary" onClick={handleLogOut}>LogOut</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You have Log out sucessfully.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LogOutComponent;
