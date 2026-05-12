"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEventToMongoDB = void 0;
const events_1 = require("../models/events");
async function saveEventToMongoDB(event) {
    try {
        // Save the event to the database
        const newEvent = new events_1.GENEVENT({
            eventName: event.eventName,
            data: JSON.stringify(event.data),
            blockHash: event.transaction.blockHash,
            blockNumber: event.transaction.blockNumber,
            transactionHash: event.transaction.transactionHash,
        });
        await newEvent.save();
        console.error('Event saved to MongoDB successfully:', newEvent.eventName);
    }
    catch (error) {
        console.error('Error saving event to MongoDB:', error);
    }
}
exports.saveEventToMongoDB = saveEventToMongoDB;
