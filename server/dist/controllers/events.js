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
exports.getG3X7Matrixes = exports.getG3X2Matrixes = exports.getUsersLast24Hour = exports.getEvents = void 0;
const event_1 = require("../models/event");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userAddress = req.params.id;
    const { currentPage, itemsPerPage } = req.body;
    try {
        const totalEventsCount = yield event_1.GENEVENT.countDocuments({
            data: {
                $regex: new RegExp(`"referrer":"${userAddress}"`),
            },
        });
        const totalPages = Math.ceil(totalEventsCount / itemsPerPage);
        const result = yield event_1.GENEVENT.find({
            data: {
                $regex: new RegExp(`"referrer":"${userAddress}"`),
            },
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
exports.getEvents = getEvents;
const getUsersLast24Hour = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.id;
    try {
        let allEvents;
        if (eventId === "gen") {
            // Find events added in the last 24 hours with the name "registration"
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            allEvents = yield event_1.GENEVENT.find({
                createdAt: { $gte: twentyFourHoursAgo },
                eventName: "Registration",
            }).sort({ createdAt: 1 });
        }
        else {
            return res.status(400).json({ message: "Invalid event ID" });
        }
        res.status(200).json({ data: allEvents });
    }
    catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "An error occurred", Error: error });
    }
});
exports.getUsersLast24Hour = getUsersLast24Hour;
const getG3X2Matrixes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPage, itemsPerPage, userAddress, matrixLevel } = req.body;
    try {
        const totalEventsCount = yield event_1.GENEVENT.countDocuments({
            $and: [
                {
                    data: {
                        $regex: new RegExp(`"referrer":"${userAddress}"`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"level":${matrixLevel}`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"matrix":${1}`),
                    },
                },
            ],
            eventName: "NewUserPlace" || "Reinvest",
        });
        const totalPages = Math.ceil(totalEventsCount / itemsPerPage);
        const result = yield event_1.GENEVENT.find({
            $and: [
                {
                    data: {
                        $regex: new RegExp(`"referrer":"${userAddress}"`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"level":${matrixLevel}`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"matrix":${1}`),
                    },
                },
            ],
            eventName: "NewUserPlace" || "Reinvest",
        })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);
        res.status(200).json({
            data: result,
            pagination: {
                totalPages: totalPages,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getG3X2Matrixes = getG3X2Matrixes;
const getG3X7Matrixes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { currentPage, itemsPerPage, userAddress, matrixLevel } = req.body;
    try {
        const totalEventsCount = yield event_1.GENEVENT.countDocuments({
            $and: [
                {
                    data: {
                        $regex: new RegExp(`"referrer":"${userAddress}"`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"level":${matrixLevel}`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"matrix":${1}`),
                    },
                },
                {
                    "userId.hex": {
                        $ne: "0x00", // Assuming "hex" is a string. If it's a number, use $ne: 0
                    },
                },
            ],
            eventName: "NewUserPlace" || "Reinvest",
        });
        const totalPages = Math.ceil(totalEventsCount / itemsPerPage);
        const result = yield event_1.GENEVENT.find({
            $and: [
                {
                    data: {
                        $regex: new RegExp(`"referrer":"${userAddress}"`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"level":${matrixLevel}`),
                    },
                },
                {
                    data: {
                        $regex: new RegExp(`"matrix":${1}`),
                    },
                },
                {
                    "userId.hex": {
                        $ne: "0x00", // Assuming "hex" is a string. If it's a number, use $ne: 0
                    },
                },
            ],
            eventName: "NewUserPlace" || "Reinvest",
        })
            .skip((currentPage - 1) * itemsPerPage)
            .limit(itemsPerPage);
        res.status(200).json({
            data: result,
            pagination: {
                totalPages: totalPages,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.getG3X7Matrixes = getG3X7Matrixes;
