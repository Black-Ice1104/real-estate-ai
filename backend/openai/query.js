import mongoose from "mongoose";
import { findAds } from "../models/ads.js";  // Ensure this path is correct

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:vLg7xAPUUXmloldC@backenddb.vrypwqn.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.error('Failed to connect:', err));


const minPrice = 200000;
const maxPrice = 1000000;
const minLivingArea = 1000;
const maxLivingArea = 2000;
const minBedroom = 1;
const maxBedroom = 3;

// Example usage of findAds
async function main() {
  const searchParameters = {
    price: {
        $gte: minPrice,
        $lte: maxPrice
      },
    livingArea: {
    $gte: minLivingArea,
    $lte: maxLivingArea
    },
    bedrooms: {
    $gte: minBedroom,
    $lte: maxBedroom
    },
    // city: "Los Angeles",
    // state: "CA"
  };

  try {
    const ads = await findAds(searchParameters);
    console.log('Ads found:', ads);
  } catch (error) {
    console.error('Error retrieving ads:', error);
  }
}

main();
