//const express = require('express');
import express from 'express';
import GetDataFromAPI from './models/zillowApiRequest.js';
//const GetDataFromAPI = require('./backend/models/zillowApiRequest');
import { Ad, findAds, outPutAllCity} from './models/ads.js';
import cors from 'cors';
import mongoose from 'mongoose';
import {generateText} from '../backend/openai/generateText.js';
import userRoutes from './router/userRoutes.js';
import {authenticate, checkRole} from './middleware/auth.js';
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

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    
    res.send('Hello World!');
});

// app.post('/Search', async(req, res) => {
//     try{
//         console.log("string: " + req.body.data);
//         const inputText = `Please analyze the following content ${req.body.data} and identify the corresponding variable values from the original text
//         minPrice number,
//         maxPrice number,
//         minBedrooms number,
//         maxBedrooms number,
//         minBathrooms number,
//         maxBathrooms number,
//         bedrooms number,
//         bathrooms number,
//         city string,
//         state string,
//         minLivingArea number,
//         maxLivingArea number,
//         minLandsize number,
//         maxLandSize number,
//         address string,
//         If not mentioned, do not output corresponding parameter. Do not generate parameters which value is null! Please generate the corresponding JSON format. 
//         Please check very carefully, expecially for city or state, do not forget them. When using a state name, please use the abbreviation of that state.
//         For cities, if they are abbreviated, please use their full name. Do not give parameter 
//         Please note that there are more or less related words in the input statement than similar ones. Do not forget maxPrice or minPrice or maxPrice.
//         If content said need more or less bedrooms or bathrooms, please use minBedrooms, maxBedrooms, minBathrooms, maxBathrooms, instead of bedrooms or bathrooms`;

//         // console.log('Received data: ', inputText);
//         const text = await generateText(inputText);
//         // console.log("text type: " + typeof(text));
//         //const text = await generateText("Hello!");
//         console.log('Get Data: ', text);
//         const result = await findAds(text);
//         console.log('Recieved result: ', result);
//         res.json(result);
//     } catch (error){
//         console.error('Error processing Search request: ', error);
//     }
// });

app.post('/Search', authenticate, checkRole(['admin', 'user']), async(req, res) => {
    try{
        console.log("string: " + req.body.data);
        const inputText = `Please analyze the following content ${req.body.data} and identify the corresponding variable values from the original text
        minPrice number,
        maxPrice number,
        minBedrooms number,
        maxBedrooms number,
        minBathrooms number,
        maxBathrooms number,
        bedrooms number,
        bathrooms number,
        city string,
        state string,
        minLivingArea number,
        maxLivingArea number,
        minLandsize number,
        maxLandSize number,
        address string,
        If not mentioned, do not output corresponding parameter. Do not generate parameters which value is null! Please generate the corresponding JSON format. 
        Please check very carefully, expecially for city or state, do not forget them. When using a state name, please use the abbreviation of that state.
        For cities, if they are abbreviated, please use their full name. Do not give parameter 
        Please note that there are more or less related words in the input statement than similar ones. Do not forget maxPrice or minPrice or maxPrice.
        If content said need more or less bedrooms or bathrooms, please use minBedrooms, maxBedrooms, minBathrooms, maxBathrooms, instead of bedrooms or bathrooms`;

        // console.log('Received data: ', inputText);
        const text = await generateText(inputText);
        // console.log("text type: " + typeof(text));
        //const text = await generateText("Hello!");
        console.log('Get Data: ', text);
        const result = await findAds(text);
        console.log('Recieved result: ', result);
        res.json(result);
    } catch (error){
        console.error('Error processing Search request: ', error);
        res.status(500).send(error.message);
    }
});

app.get('/GetCities', async(req, res) => {
    try{
        const cities = await outPutAllCity();
        res.json(cities);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
app.get('/Test', async(req, res) => {
    
    // res.send('Hello World!');
    try{
        const ads = await findAds({bedrooms: 3});
        console.log('Retrieved ads:', ads);
        res.send();
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
        let htmlRes = '<h1>Search Results for ${location}</h1>';
        htmlRes += '<pre>${JSON.stringfy(data, null, 2)}</pre>';
        res.send('Request');
        
        console.log(data);
    } catch (error) {
        console.error('Error occured while requesting', error);
        res.status(500).json({message: 'server error'});
    }
});

app.get('/fetch-store', async(req, res) => {
    const location = req.query.location || 'Los Angeles, CA';
    console.log(location);
    try {
        const data = await GetDataFromAPI(location);
        console.log(data);   
        await Ad.insertMany(data.map(data => ({
            photos: data.imgSrc,
            price: data.price,
            currency: data.currency,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
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
        })), {ordered: false});
        res.send('Requset');   
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
