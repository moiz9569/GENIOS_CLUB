"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MATRIX = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MatrixSchema = new mongoose_1.default.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
    },
    level: {
        type: Number,
        max: 7,
        required: true,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    address: {
        type: String,
        required: true,
    },
    currentReferrer: {
        type: String,
        required: true,
    },
    partnersCount: {
        type: Number,
        default: 0,
    },
    reinvestCount: {
        type: Number,
        default: 0,
    },
    firstLevel: {
        type: [String],
        default: [],
    },
    secondLevel: {
        type: [String],
        default: [],
    },
    thirdLevel: {
        type: [String],
        default: [],
    },
    FourthLevel: {
        type: [String],
        default: [],
    },
    FifthLevel: {
        type: [String],
        default: [],
    },
    SixthLevel: {
        type: [String],
        default: [],
    },
    SeventhLevel: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
exports.MATRIX = mongoose_1.default.model("MATRIX", MatrixSchema);
