//const express = require('express');
import express from 'express';
import GetDataFromAPI from './backend/models/zillowApiRequest.js';
//const GetDataFromAPI = require('./backend/models/zillowApiRequest');
import { insertSignleData } from './backend/models/ads.js';


const app = express();
const port = 3000;
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

app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});