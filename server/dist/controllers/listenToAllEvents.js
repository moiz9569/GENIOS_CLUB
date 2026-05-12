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
exports.listenToAllEvents = void 0;
const saveEventsToDB_1 = require("./saveEventsToDB");
const addresses_1 = require("../constant/addresses");
const contract_1 = require("../config/contract");
// This function listens to all the events emitted form the smart contract and will save the events to allEventsData.json
function listenToAllEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Listening to events...');
        try {
            const contract = yield contract_1.sdk.getContract(addresses_1.GenAddress, addresses_1.GenAbi);
            contract.events.listenToAllEvents((event) => __awaiter(this, void 0, void 0, function* () {
                if (event) {
                    yield (0, saveEventsToDB_1.saveEventToMongoDB)(event);
                }
            }));
        }
        catch (error) {
            console.log('Error while listening to all Events: ', error);
        }
    });
}
exports.listenToAllEvents = listenToAllEvents;
