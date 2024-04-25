// const axios = require('axios');
import axios from 'axios';
/**
 * request Zillow API
 * @param {string} location (Input Ex: Los Angeles, CA) 
 * @returns {Promise} return data
 */
const GetDataFromAPI = async (location) => {
  const options = {
    method: 'GET',
    url: 'https://zillow56.p.rapidapi.com/search',
    params: {location: 'Los Angeles, CA',
             status: 'forSale'},
    headers: {
      'X-RapidAPI-Key': '2c19124f6dmsh6ba340923d3990fp185fc7jsn23a783a614f9',
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
    }
  };
  
  try{
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('API Request Failed: ', error);
    throw error;
  }
};

//module.exports = GetDataFromAPI;

export default GetDataFromAPI;