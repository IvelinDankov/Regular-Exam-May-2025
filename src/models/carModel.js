import { Schema, Types, model } from "mongoose";

const carSchema = new Schema({
  model: {
    type: String,
    required: [true, "Model is required. Please insert it!"],
    minLength: [2, "Model should be at least 2 characters"],
  },
  manufacturer: {
    type: String,
    required: [true, "Manufacturer is required. Please insert it!"],
    minLength: [3, "Manufacturer should be at least 3 characters"],
  },
  engine: {
    type: String,
    required: [true, "Engine is required. Please insert it!"],
    minLength: [3, "Engine should be at least 3 characters"],
  },
  topSpeed: {
    type: Number,
    required: [true, "Topspeed is required. Please insert it!"],
    min: [10, "Topspeed must be at least two digit."],
  },
  image: {
    type: String,
    required: [true, "Image is required. Please insert it!"],
    validate: [/^https?:\/\//, "Image Url must start with http:// or https://"],
  },
  description: {
    type: String,
    required: [true, "Description is required. Please insert it!"],
    minLength: [5, "Description should be at least 5 charachters!"],
    maxLength: [500, "Description allowed max 500 characters!"],
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
