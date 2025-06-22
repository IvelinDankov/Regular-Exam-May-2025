import { Router } from "express";
import errorMsg from "../utils/errorMsg.js";
import carService from "../services/carService.js";
import userService from "../services/userService.js";

const carController = Router();

carController.get("/catalog", async (req, res) => {
  try {
    const cars = await carService.getAllCars();

    res.render("car/all-posts", { cars });
  } catch (err) {
    const error = errorMsg(err);
    res.render("car/all-posts", { error });
  }
});
carController.get("/create", (req, res) => {
  res.render("car/create");
});
carController.post("/create", async (req, res) => {
  const carData = req.body;
  const userId = req.user?.id;
  try {
    await carService.createOneCar(carData, userId);
    res.redirect("/cars/catalog");
  } catch (err) {
    const error = errorMsg(err);
    res.render("car/create", { error, data: carData });
  }
});

carController.get("/:carId/like", async (req, res) => {
  const carId = req.params.carId;
  const userId = req.user?.id;

  try {
    const car = await carService.getOne(carId);
    const isOwner = car.owner.equals(userId);
    if (isOwner) {
      throw new Error("Access denied! You are creator");
    }

    await carService.like(carId, userId);
    res.redirect(`/cars/${carId}/details`);
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

carController.get("/:carId/details", async (req, res) => {
  const carId = req.params.carId;
  const userId = req.user?.id;
  try {
    const car = await carService.getOne(carId);

    const isOwner = car.owner.equals(userId);

    const liked = car.likes.includes(userId);

    const totalLikes = car.likes.length;

    res.render("car/details", { car, isOwner, liked, totalLikes });
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

export default carController;
