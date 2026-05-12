import { getDirectEvents } from "../controllers/directRefrel.js";
import {
  getEvents,
  getG3X2Matrixes,
  getG3X7Matrixes,
  getUsersLast24Hour,
} from "../controllers/events.js";
import express from "express";

const eventRoutes = express.Router();

eventRoutes.get("/new-users/:id", getUsersLast24Hour);
eventRoutes.post("/:id", getEvents);
eventRoutes.post("/direct-refrel/:id", getDirectEvents);
eventRoutes.post("/g3x2-matrixes/:id", getG3X2Matrixes);
eventRoutes.post("/g3x7-matrixes/:id", getG3X7Matrixes);

export default eventRoutes;
