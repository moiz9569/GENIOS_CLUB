import express from "express";
import { add, getAdd, getUpgrade, upgrade, view } from "../controllers/matrix";

const matrixRoutes = express.Router();

matrixRoutes.get("/view/:level/:address", view);

matrixRoutes.post("/add/", add);
matrixRoutes.get("/add/:address", getAdd);

matrixRoutes.post("/up/:level", upgrade);
matrixRoutes.get("/up/:level/:address", getUpgrade);

export default matrixRoutes;
