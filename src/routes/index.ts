import express from "express";
import user from "./user.routes";

const routes = (app: any) => {
  app.use(express.json(), user);
};

export default routes;
