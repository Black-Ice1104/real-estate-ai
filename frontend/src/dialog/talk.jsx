import React, { useState } from 'react';
import { TextField, Button, Card, CardMedia, CardContent, Typography, Grid } from '@mui/material';
import CityList from '../cityList/CityList';

function MyFormComponent() {
    const dialogStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1000px',
        paddingTop: '100px', // 顶部留白，根据需要调整
    };

    const [inputValue, setInputValue] = useState('');  // 状态管理输入值
    const [data, setData] = useState([]); // 状态用于存储从服务器返回的数据

    const handleSubmit = async (event) => {
        event.preventDefault();  // 阻止表单默认提交行为
        console.log('Sending data to backend:', inputValue);
        // 这里使用 fetch 发送数据到后端端口
        try {
            const response = await fetch('http://localhost:3001/Search', {
                method: 'POST',   // 或 'GET'，取决于你的后端需求
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: inputValue })  // 将输入数据作为 JSON 发送
            });
            console.log('Input value:', inputValue);
            const responseData = await response.json();
            console.log('Received from backend:', responseData);
            setData(responseData);
        } catch (error) {
            console.error('Error sending data to backend:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'center', justifyContent: 'flex-start', marginTop: '10vh', marginLeft:'10vh' }}>
                <form onSubmit={handleSubmit} style={{ width: '80%' }}> {/* 调整内部宽度为80%以进一步居中 */}
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
            <div style={{ position: 'fixed', right: 0, top: 0, width: '30%', height: '100vh', overflowY: 'auto' }}>
                <CityList />
            </div>
        </div>
    );
}

export default MyFormComponent;
