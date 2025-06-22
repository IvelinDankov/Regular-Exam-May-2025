import { Router } from "express";
import errorMsg from "../utils/errorMsg.js";
import carService from "../services/carService.js";
import userService from "../services/userService.js";
import authMiddleware from "../middlewares/authMiddleware.js";

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
carController.get("/create", authMiddleware.isAuth, (req, res) => {
  res.render("car/create");
});
carController.post("/create", authMiddleware.isAuth, async (req, res) => {
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

carController.get("/:carId/like", authMiddleware.isAuth, async (req, res) => {
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

    let hasLikes = true;
    if (totalLikes === 0) {
      hasLikes = false;
    }

    const carLikes = await carService.findLikes(car);

    const likedUsers = carLikes.likes.map((like) => like.email).join(", ");

    res.render("car/details", {
      car,
      isOwner,
      liked,
      totalLikes,
      hasLikes,
      likedUsers,
    });
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

carController.get("/:carId/edit", authMiddleware.isAuth, async (req, res) => {
  const carId = req.params.carId;

  try {
    const car = await carService.getOne(carId);

    res.render("car/edit", { car });
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});
carController.post("/:carId/edit", authMiddleware.isAuth, async (req, res) => {
  const carId = req.params.carId;
  const carData = req.body;

  try {
    const car = await carService.getOne(carId);

    const isOwner = car.owner.equals(userId);

    if (!isOwner) {
      throw new Error("Access is denied! You are not Owner!");
    }
    await carService.updateCar(carId, carData);
    res.redirect(`/cars/${carId}/details`);
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

carController.get("/:carId/delete", authMiddleware.isAuth, async (req, res) => {
  const carId = req.params.carId;

  try {
    const car = await carService.getOne(carId);

    const isOwner = car.owner.equals(userId);

    if (!isOwner) {
      throw new Error("Access is denied! You are not Owner!");
    }

    await carService.removeCar(carId);
    res.redirect("/cars/catalog");
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

export default carController;
