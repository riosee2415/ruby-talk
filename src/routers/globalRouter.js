import express from "express";
import {
  testScreen,
  mainController,
  friendsController,
  messageController,
  profileController,
  loginController,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", mainController);
globalRouter.get("/friends", friendsController);
globalRouter.get("/message", messageController);
globalRouter.get("/profile", profileController);
globalRouter.post("/login", loginController);

export default globalRouter;
