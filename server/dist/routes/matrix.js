"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const matrix_1 = require("../controllers/matrix");
const matrixRoutes = express_1.default.Router();
matrixRoutes.get("/view/:level/:address", matrix_1.view);
matrixRoutes.post("/add/", matrix_1.add);
matrixRoutes.get("/add/:address", matrix_1.getAdd);
matrixRoutes.post("/up/:level", matrix_1.upgrade);
matrixRoutes.get("/up/:level/:address", matrix_1.getUpgrade);
exports.default = matrixRoutes;
