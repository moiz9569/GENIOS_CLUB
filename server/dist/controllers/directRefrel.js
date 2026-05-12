"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectEvents = void 0;
const event_1 = require("../models/event");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const getDirectEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = req.params.id;
    const { currentPage, itemsPerPage } = req.body;
    try {
        const totalEventsCount = yield event_1.GENEVENT.countDocuments({
            data: {
                $regex: new RegExp(`"referrer":"${userAddress}"`),
            },
            eventName: "Registration",
        });
        const totalPages = Math.ceil(totalEventsCount / itemsPerPage);
        const result = yield event_1.GENEVENT.find({
            data: {
                $regex: new RegExp(`"referrer":"${userAddress}"`),
            },
            eventName: "Registration",
        })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);
        res.status(200).json({
            data: result,
            pagination: {
                currentPage,
                totalPages,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getDirectEvents = getDirectEvents;
