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
    params: {location: location,
             status: 'forSale'},
    headers: {
      'X-RapidAPI-Key': '8109edae8emshe1b81ea98acc02ap1b455ajsn9d47583ef2fc',
      'X-RapidAPI-Host': 'zillow56.p.rapidapi.com'
    }
  };
  console.log("request: " + location);
  try{
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error('API Request Failed: ', error);
    throw error;
  }
};

//module.exports = GetDataFromAPI;

export default GetDataFromAPI;