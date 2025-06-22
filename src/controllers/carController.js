import { Router } from "express";
import errorMsg from "../utils/errorMsg.js";
import carService from "../services/carService.js";

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

export default carController;
