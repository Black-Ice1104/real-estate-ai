import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function LoginPage() {
    const [open, setOpen] = useState(false); // 控制对话框开关
    const [username, setUsername] = useState(''); // 用户名
    const [password, setPassword] = useState(''); // 密码

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleLogin = () => {
    //     console.log('Username:', username, 'Password:', password);
    //     // 这里可以添加登录逻辑
    //     handleClose(); // 登录后关闭对话框
    // };
    const handleLogin = async (username, password) => {
        try{
            console.log("username: " + username);
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log('token: ', data.token);
                console.log('Login successfully');
                handleClose();
            } else {
                console.error('Login failed: ', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', marginBottom:'5vh'}}>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Log in
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Log in</DialogTitle>
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
                    <Button onClick={() => handleLogin(username, password)} color="primary">
                        Log in
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default LoginPage;
