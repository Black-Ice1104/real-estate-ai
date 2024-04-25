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
    landsize: String,
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
export const findAds = (query) => {
  return Ad.find(query).exec();
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