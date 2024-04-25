import mongoose from "mongoose";

// mongoose.connect('mongodb+srv://admin:vLg7xAPUUXmloldC@backenddb.vrypwqn.mongodb.net/?retryWrites=true&w=majority&appName=BackendDB')
// .then(() => console.log('MongoDB Connected!'))
// .catch(err => console.error('Failed to connect:', err));

const { model, Schema, ObjectId } = mongoose;

const adSchema = new Schema(
  {
    photos: String,
    price: Number,
    currency: String,
    bedrooms: Number,
    bathrooms: Number,
    landsize: Number,
    livingArea: Number,
    address: {
      type: String,
      required: true,
    },
    // url: {
    //     type: String,
    //     required: true,
    //     maxLength: 255,
    //   },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [34.052235, -118.243683],
      },
    },
    zipcode: String,
    title: {
      type: String,
      maxLength: 255,
    },
    city: String,
    state: String
  }
);
adSchema.index({ location: "2dsphere" });

export const Ad = mongoose.model('Ad', adSchema);

/**
 * qeury data 
 *  @param {Object} condition for query
 *  @return {Promise} result with Promise
 */ 
export const findAds = async ({
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
  address = null
} = {}) => {
  try {
    let query = {};

    if(minPrice && maxPrice) {
      query.price = {$gte:minPrice, $lte: maxPrice};
    } else if (minPrice) {
      query.price = {$gte: minPrice };
    } else if (maxPrice) {
      query.price = {$lte: maxPrice};
    }

    if(minLivingArea && maxLivingArea) {
      query.price = {$gte:minLivingArea, $lte: maxLivingArea};
    } else if (minLivingArea) {
      query.price = {$gte: minLivingArea };
    } else if (maxLivingArea) {
      query.price = {$lte: maxLivingArea};
    }

    if(minLandsize && maxLandSize) {
      query.price = {$gte:minLandsize, $lte: maxLandSize};
    } else if (minLandsize) {
      query.price = {$gte: minLandsize };
    } else if (maxLandSize) {
      query.price = {$lte: maxLandSize};
    }

    if(bedrooms) query.bedrooms = {$gte: bedrooms};
    if(bathrooms) query.bathrooms = {$gte: bathrooms};
    if(city) query.bathrooms = {$gte: city};
    if(state) query.bathrooms = {$gte: state};
    if(address) query.address = address;

    const ads = await Ad.find(query).exec();
    return ads;
  } catch (error) {
    console.error('Error querying:', error);
    throw new Error('Failed to retrieve ads');
  }
};

/**
 * insert single record
 * @param {Object} houseData
 * @return {Promise} result with Promise
 */
export const insertSignleData = (houseData) => {
  const newAd = new Ad(houseData);
  return newAd.save();
}

/**
 * insert multiple records
 * @param {Object} houseData
 * @return {Promise} result with Promise
 */
export const insertMultipleData = async (houseData) => {
  try {
    const result = await Ad.insertMany(houseData);
    return result;
  } catch (error) {
    console.error('Insert failed', error);
    throw error;
  }
}

// export default mongoose.model("Ad", adSchema);