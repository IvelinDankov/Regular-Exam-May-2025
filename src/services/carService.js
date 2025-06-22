import Car from "../models/carModel.js";

export default {
  getAllCars() {
    return Car.find();
  },
  createOneCar(carData, userId) {
    return Car.create({ ...carData, owner: userId });
  },
  getOne(carId) {
    return Car.findById(carId);
  },
  like(carId, userId) {
    return Car.findByIdAndUpdate(carId, { $push: { likes: userId } });
  },
};
