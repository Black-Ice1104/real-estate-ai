const express = require('express');
const GetDataFromAPI = require('./backend/models/zillowApiRequest');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.get('/requestData', async(req, res) =>{
    const location = req.query.location || 'Los Angeles, CA';

    try{
        const data = await GetDataFromAPI(location);
        let htmlRes = '<h1>Search Results for ${location}</h1>';
        htmlRes += '<pre>${JSON.stringfy(data, null, 2)}</pre>';
        res.send(htmlRes);
        console.log(data);
    } catch (error) {
        console.error('Error occured while requesting', error);
        res.status(500).json({message: 'server error'});
    }
});

app.listen(port, () => {
    console.log(`服务器正在运行在 http://localhost:${port}`);
});