import React, { useState } from 'react';
import { TextField, Button, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import CityList from '../cityList/CityList';
import LoginPage from '../logIn/logIn';
import SignUpPage from '../signUp/signUp';
import LogOutComponent from '../logOut/logOut';

function MyFormComponent() {
    const dialogStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1000px',
        paddingTop: '100px',
    };

    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        console.log(token);
        console.log('Sending data to backend:', inputValue);
        try {
            const response = await fetch('http://localhost:3001/Search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                },
                body: JSON.stringify({ data: inputValue })
            });
            console.log('Input value:', inputValue);
            const responseData = await response.json();
            console.log('Received from backend:', responseData);
            setData(responseData);
        } catch (error) {
            console.error('Error sending data to backend:', error);
            alert(error);
        }
    };

    return (
        <div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={{ justifyContent: 'center', justifyContent: 'flex-start', marginTop: '5vh', marginLeft: '10vh',width:'70%' }}>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <LoginPage/>
                            <SignUpPage />
                            <LogOutComponent/>
                        </div>


                        <form onSubmit={handleSubmit} style={{width:'80%'}}>
                            <TextField
                                multiline
                                rows={4}
                                label="Type something"
                                variant="outlined"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                fullWidth
                            />
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                            {data.length > 0 ? (
                                <Grid container spacing={2}>
                                    {data.map((item, index) => (
                                        <Grid item key={index} xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 345 }}>
                                                <CardMedia
                                                    component="img"
                                                    height="140"
                                                    image={item.photos}
                                                    alt="Property Image"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {item.address}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Bedrooms: {item.bedrooms}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Bathrooms: {item.bathrooms}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Living Area: {item.livingArea} sqft
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Price: ${item.price}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Address: {item.address}, {item.city}, {item.state}, {item.zipcode}

                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            ) : (
                                <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                                    No Result Found
                                </Typography>
                            )}
                        </form>
                    </div>
                </div>
                <div style={{ position: 'fixed', right: 0, top: 0, width: '30%', height: '100vh', overflowY: 'auto' }}>
                    <CityList />
                </div>
            </div>
        </div>
    );
}

export default MyFormComponent;
