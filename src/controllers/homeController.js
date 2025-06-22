import { Router } from "express";
import carService from "../services/carService.js";
import errorMsg from "../utils/errorMsg.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
  res.render("home");
});

homeController.get("/my-posts", async (req, res) => {
  const userId = req.user.id;

  try {
    const myPosts = await carService.getMyPosts(userId);

    res.render("my-posts", { myPosts });
  } catch (err) {
    const error = errorMsg(err);
    res.render("404", { error });
  }
});

export default homeController;
