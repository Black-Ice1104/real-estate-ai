//const express = require('express');
import express from 'express';
import GetDataFromAPI from './models/zillowApiRequest.js';
//const GetDataFromAPI = require('./backend/models/zillowApiRequest');
import { Ad, findAds} from './models/ads.js';
import cors from 'cors';
import mongoose from 'mongoose';
import {generateText} from '../backend/openai/generateText.js';


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:vLg7xAPUUXmloldC@backenddb.vrypwqn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log('MongoDB Connected!');
    app.listen(port, () => {
        console.log('Server is running on port 3001');
    });
})
.catch(err => console.error('Failed to connect:', err));

app.get('/', (req, res) => {
    
    res.send('Hello World!');
});
app.post('/Search', async(req, res) => {
    try{
        const inputText = `Please analyze the following content ${req.body.text} and identify the corresponding variable values from the original text
        minPrice = null,
        maxPrice = null,
        bedrooms = null,
        bathrooms = null,
        city = null,
        state = null,
        minLivingArea = null,
        maxLivingArea = null,
        minLandsize = null,
        maxLandSize = null,
        address = null,
        If not mentioned, do not output corresponding parameter. Please generate the corresponding JSON format. 
        Please check very carefully, expecially for city or state, do not forget them. When using a state name, please use the abbreviation of that state.
        Please note that there are more or less related words in the input statement than similar ones. Do not forget maxPrice or minPrice or maxPrice.`;

        console.log('Received data: ', inputText);
        const text = await generateText(inputText);
        //const text = await generateText("Hello!");
        
        console.log('Get Data: ', text);
        const resuslt = await findAds(text);
        console.log('Recieved result: ', resuslt);
        res.json(resuslt);
    } catch (error){
        console.error('Error processing Search request: ', error);
    }
});

app.get('/Test', async(req, res) => {
    
    // res.send('Hello World!');
    try{
        const ads = await findAds({minPrice: 1, maxPrice: 800000, bedrooms: 3});
        console.log('Retrieved ads:', ads);
    } catch (error){
        console.error('Error processing Test request: ', error);
    }
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
            landSize: data.lotAreaValue,
            livingArea: data.livingArea,
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

//接受请求
app.post('/data', (req, res) => {
    const receivedText = req.body.text;
    console.log('Reveived text: ',receivedText);
    res.send('Text received successfully');
})
// app.listen(port, () => {
//     console.log(`服务器正在运行在 http://localhost:${port}`);
// });