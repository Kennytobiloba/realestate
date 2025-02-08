import mongoose from "mongoose";

const ArrayInfo = new mongoose.Schema({
  parking: Boolean,
  furnished: Boolean,
  other: Boolean,
});

const HouseSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  Housename: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  properties: {
    type: [ArrayInfo], // Use [ArrayInfo] for an array of ArrayInfo objects
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  },
  numberbed: {
    type: Number,
    required: true,
  },
  numberbath: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Available", "sold", "Rented"],
    default: "Available", // Fix the typo here
  },
 
});

const Houesemodel = mongoose.models?.House || mongoose.model("House", HouseSchema); 

export default Houesemodel;