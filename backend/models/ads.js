import mongoose from "mongoose";
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

adSchema.index({ location: "2dsphere" });
export default mongoose.model("Ad", adSchema);