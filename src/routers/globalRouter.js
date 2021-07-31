import express from "express";
import {
  testScreen,
  mainController,
  friendsController,
  messageController,
  profileController,
  loginController,
  sendMessageController,
} from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", mainController);
globalRouter.get("/friends", friendsController);
globalRouter.get("/message", messageController);
globalRouter.get("/profile", profileController);
globalRouter.post("/login", loginController);
globalRouter.post("/sendMsg", sendMessageController);

export default globalRouter;
