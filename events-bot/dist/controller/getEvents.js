"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsSetup = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const contract_1 = require("../utils/contract");
const contract_2 = require("../config/contract");
const saveEventsToDB_1 = require("./saveEventsToDB");
// Function for getting the latest block
async function getLatestBlockNumber() {
    try {
        const response = await axios_1.default.post(process.env.RPC_URL, {
            jsonrpc: '2.0',
            id: 1,
            method: 'eth_blockNumber',
            params: [],
        });
        const blockNumberHex = response.data.result;
        const blockNumber = parseInt(blockNumberHex, 16);
        return blockNumber;
    }
    catch (error) {
        console.error('Error:', error);
    }
}
// With this function you can get all the events emitted in the past this will also save the events to the allEventsData.json
async function eventsSetup() {
    try {
        const endBlock = await getLatestBlockNumber();
        let fromBlock = 46840543; // Start block
        let batchSize = 1000; // Number of blocks to fetch at a time
        if (endBlock && fromBlock >= endBlock) {
            console.log('No more blocks to process.');
            return;
        }
        while (endBlock && fromBlock < endBlock) {
            let toBlock = fromBlock + batchSize;
            // Adjust the toBlock to not exceed endBlock
            toBlock = Math.min(toBlock, endBlock);
            console.log(`Fetching events from block ${fromBlock} to ${toBlock}`);
            const events = await getEvent({ fromBlock, toBlock });
            if (events) {
                for (let i = 0; i < events.length; i++) {
                    const event = events[i];
                    await (0, saveEventsToDB_1.saveEventToMongoDB)(event);
                }
            }
            // Updating fromBlock and toBlock for the next iteration
            fromBlock = toBlock + 1;
        }
    }
    catch (error) {
        console.log('Error: ', error);
    }
}
exports.eventsSetup = eventsSetup;
async function getEvent({ fromBlock, toBlock }) {
    try {
        const contract = await contract_2.sdk.getContract(contract_1.Address, contract_1.Abi);
        const filter = {
            fromBlock: fromBlock,
            toBlock: toBlock,
        };
        const events = await contract.events.getAllEvents(filter);
        return events;
    }
    catch (error) {
        console.log('Error: ', error);
    }
}
