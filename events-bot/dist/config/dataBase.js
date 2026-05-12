"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose_1.default.connect(process.env.MONGODB_URI, options);
        console.log('Database connected');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};
exports.default = connectDB;
