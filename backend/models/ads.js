import mongoose from "mongoose";

mongoose.connect('', {
  userNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected!'))
.catch(err => console.err('Failed to connect:', err));

const { model, Schema, ObjectId } = mongoose;

const adSchema = new Schema(
  {
    photos: [{}],
    price: {
      type: Number,
      maxLength: 255,
    },
    bedrooms: Number,
    bathrooms: Number,
    landsize: String,
    address: {
      type: String,
      required: true,
      maxLength: 255,
    },
    url: {
        type: String,
        required: true,
        maxLength: 255,
      },
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
    title: {
      type: String,
      maxLength: 255,
    },
  }
);

const Ad = mongoose.model('Ad', adSchema);

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
export const insertMultipleData = (houseData) => {
  return Ad.insertMany(houseData);
}

adSchema.index({ location: "2dsphere" });
export default mongoose.model("Ad", adSchema);