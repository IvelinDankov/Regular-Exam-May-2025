import Car from "../models/carModel.js";

export default {
  getAllCars() {
    return Car.find();
  },
};
