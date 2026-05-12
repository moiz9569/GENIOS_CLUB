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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventsSetup = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const contract_1 = require("../config/contract");
const saveEventsToDB_1 = require("./saveEventsToDB");
const addresses_1 = require("../constant/addresses");
// Function for getting the latest block
function getLatestBlockNumber() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(process.env.RPC_URL, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_blockNumber",
                params: [],
            });
            const blockNumberHex = response.data.result;
            const blockNumber = parseInt(blockNumberHex, 16);
            return blockNumber;
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
// With this function you can get all the events emitted in the past this will also save the events to the allEventsData.json
function eventsSetup() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const endBlock = yield getLatestBlockNumber();
            let fromBlock = 46937258; // Start block
            let batchSize = 1000; // Number of blocks to fetch at a time
            if (endBlock && fromBlock >= endBlock) {
                console.log("No more blocks to process.");
                return;
            }
            while (endBlock && fromBlock < endBlock) {
                let toBlock = fromBlock + batchSize;
                // Adjust the toBlock to not exceed endBlock
                toBlock = Math.min(toBlock, endBlock);
                console.log(`Fetching events from block ${fromBlock} to ${toBlock}`);
                const events = yield getEvent({ fromBlock, toBlock });
                if (events) {
                    for (let i = 0; i < events.length; i++) {
                        const event = events[i];
                        yield (0, saveEventsToDB_1.saveEventToMongoDB)(event);
                    }
                }
                // Updating fromBlock and toBlock for the next iteration
                fromBlock = toBlock + 1;
            }
        }
        catch (error) {
            console.log("Error: ", error);
        }
    });
}
exports.eventsSetup = eventsSetup;
function getEvent({ fromBlock, toBlock }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = yield contract_1.sdk.getContract(addresses_1.GenAddress, addresses_1.GenAbi);
            const filter = {
                fromBlock: fromBlock,
                toBlock: toBlock,
            };
            const events = yield contract.events.getAllEvents(filter);
            return events;
        }
        catch (error) {
            console.log("Error: ", error);
        }
    });
}
