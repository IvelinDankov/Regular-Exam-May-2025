import { Schema, Types, model } from "mongoose";

const carSchema = new Schema({
  model: {
    type: String,
    required: [true, "Model is required. Please insert it!"],
  },
  manufacturer: {
    type: String,
    required: [true, "Manufacturer is required. Please insert it!"],
  },
  engine: {
    type: String,
    required: [true, "Engine is required. Please insert it!"],
  },
  topSpeed: {
    type: Number,
    required: [true, "topSpeed is required. Please insert it!"],
  },
  image: {
    type: String,
    required: [true, "Image is required. Please insert it!"],
  },
  description: {
    type: String,
    required: [true, "Description is required. Please insert it!"],
  },
  likes: [
    {
      type: Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Car = model("Car", carSchema);

export default Car;
