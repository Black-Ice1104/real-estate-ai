// index.js
import express from 'express';
import mongoose from 'mongoose';
//import { findAds, insertSignleData, insertMultipleData } from './backend/models/ads.js';  // 确保路径正确


const app = express();
app.use(express.json()); // 支持JSON-encoded bodies

mongoose.connect('mongodb+srv://admin:vLg7xAPUUXmloldC@backenddb.vrypwqn.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB')
.then(() => {
    console.log('MongoDB Connected!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
})
.catch(err => console.error('Failed to connect:', err));



// app.post('/insertSingle', async (req, res) => {
//   try {
//     const data = await insertSignleData(req.body);
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.post('/insertMultiple', async (req, res) => {
//   try {
//     const data = await insertMultipleData(req.body);
//     res.status(200).send(data);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get('/findAds', async (req, res) => {
//   try {
//     const query = req.query;
//     const ads = await findAds(query);
//     res.status(200).send(ads);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
