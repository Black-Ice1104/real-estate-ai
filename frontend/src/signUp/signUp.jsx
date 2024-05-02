import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function SignUpPage() {
    const [open, setOpen] = useState(false); // 控制对话框开关
    const [username, setUsername] = useState(''); // 用户名
    const [password, setPassword] = useState(''); // 密码

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSignUp = async() => {
        console.log('Username:', username, 'Password:', password);
        try{
            const response = await fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.message === 'User registered successfully') {
                localStorage.setItem('token', data.token);
                console.log('token: ', data.token);
                alert('Signup successfully');
                handleClose();
            } else {
                alert('Login failed: ', data.message);
            }
        } catch (error) {
            console.error('Error during Signup:', error);
        }
        handleClose(); 
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom:'5vh'}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Sign Up
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your username and password.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSignUp} color="primary">
                        Sign up
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SignUpPage;
