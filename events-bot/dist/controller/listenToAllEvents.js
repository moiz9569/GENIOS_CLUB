"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenToAllEvents = void 0;
require("dotenv/config");
const contract_1 = require("../utils/contract");
const contract_2 = require("../config/contract");
const saveEventsToDB_1 = require("./saveEventsToDB");
// This function listens to all the events emitted form the smart contract and will save the events to allEventsData.json
async function listenToAllEvents() {
    console.log('Listening to events...');
    try {
        const contract = await contract_2.sdk.getContract(contract_1.Address, contract_1.Abi);
        contract.events.listenToAllEvents(async (event) => {
            if (event) {
                await (0, saveEventsToDB_1.saveEventToMongoDB)(event);
            }
        });
    }
    catch (error) {
        console.log('Error while listening to all Events: ', error);
    }
}
exports.listenToAllEvents = listenToAllEvents;
