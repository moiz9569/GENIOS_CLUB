"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENEVENT = exports.LUCEVENT = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EventSchema = new mongoose_1.default.Schema({
    eventName: {
        type: String,
        required: true,
    },
    data: {
        type: String,
    },
    blockHash: {
        type: String,
    },
    blockNumber: {
        type: Number,
    },
    transactionHash: {
        type: String,
    },
}, { timestamps: true });
exports.LUCEVENT = mongoose_1.default.model("LUCEVENT", EventSchema);
exports.GENEVENT = mongoose_1.default.model("GENEVENT", EventSchema);
