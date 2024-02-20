import express from "express";
import userController from "../controller/user";

const routes = express.Router();

routes.post("/user", userController.createUser);
routes.get("/user/binario", userController.converteBinario);
routes.get("/user/:id/distancia", userController.findDistancesUser);
routes.get(
  "/user/:id/distancia/:radius",
  userController.findDistancesUserFromRadius
);

export default routes;
