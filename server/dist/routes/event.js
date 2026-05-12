"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const directRefrel_js_1 = require("../controllers/directRefrel.js");
const events_js_1 = require("../controllers/events.js");
const express_1 = __importDefault(require("express"));
const eventRoutes = express_1.default.Router();
eventRoutes.get("/new-users/:id", events_js_1.getUsersLast24Hour);
eventRoutes.post("/:id", events_js_1.getEvents);
eventRoutes.post("/direct-refrel/:id", directRefrel_js_1.getDirectEvents);
eventRoutes.post("/g3x2-matrixes/:id", events_js_1.getG3X2Matrixes);
eventRoutes.post("/g3x7-matrixes/:id", events_js_1.getG3X7Matrixes);
exports.default = eventRoutes;
