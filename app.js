//const express = require('express');
import express from 'express';
import GetDataFromAPI from './backend/models/zillowApiRequest.js';
//const GetDataFromAPI = require('./backend/models/zillowApiRequest');
import { Ad} from './backend/models/ads.js';

import mongoose from 'mongoose';


const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://admin:vLg7xAPUUXmloldC@backenddb.vrypwqn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log('MongoDB Connected!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(err => console.error('Failed to connect:', err));

app.get('/', (req, res) => {
    
    res.send('Hello World!');
});

app.post('/api/data', (req, res) => {
    console.log(req.body);  // 打印请求体到控制台
    res.send('Data received');
    
});  
app.get('/requestData', async(req, res) =>{
    const location = req.query.location || 'Los Angeles, CA';

    try{
        const data = await GetDataFromAPI(location);
        // let htmlRes = '<h1>Search Results for ${location}</h1>';
        // htmlRes += '<pre>${JSON.stringfy(data, null, 2)}</pre>';
        res.send('Request');
        
        console.log(data);
    } catch (error) {
        console.error('Error occured while requesting', error);
        res.status(500).json({message: 'server error'});
    }
});

app.get('/fetch-store', async(req, res) => {
    const location = req.query.location || 'Los Angeles, CA';

    try {
        const data = await GetDataFromAPI(location);
        res.send('Requset');
        // console.log(data); 
        
        await Ad.insertMany(data.map(data => ({
            photos: data.imgSrc,
            price: data.price,
            currency: data.currency,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            landSize: data.lotAreaValue + ' ' + data.lotAreaUnit,
            address: data.streetAddress,
            location: {
                type: "Point",
                coordinates:[data.longitude, data.latitude]
            },
            zipcode: data.zipcode,
            title: data.streetAddress,
            city: data.city,
            state: data.state
        })));   
    } catch (error) {
        console.error('Error occured while requesting', error);
        res.status(500).json({message: 'server error'});
    }
})

// app.listen(port, () => {
//     console.log(`服务器正在运行在 http://localhost:${port}`);
// });