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
exports.events = void 0;
const ethers_1 = require("ethers");
const addresses_1 = require("../constant/addresses");
const user_1 = require("../models/user");
const updateLevels_1 = require("../functions/updateLevels");
const matrix_1 = require("../models/matrix");
const events = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.JSON_RPC_URI);
    const contract = new ethers_1.Contract(addresses_1.GenAddress, addresses_1.GenAbi, provider);
    contract.on('UserAdd', (user, ref, level, event) => __awaiter(void 0, void 0, void 0, function* () {
        if (Number(level) === 1)
            return add(user, ref);
        upgrade(user, ref, Number(level - 1));
    }));
});
exports.events = events;
const add = (userAddress, curRefAdd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = new user_1.USER({
            address: userAddress,
            referrer: curRefAdd,
        });
        newUser.activeLevels[0] = true;
        yield newUser.save();
        const newUserMatrix = new matrix_1.MATRIX({
            code: `${0}-${userAddress}`,
            level: 0,
            address: userAddress,
            referrer: curRefAdd,
            currentReferrer: curRefAdd,
        });
        const savedUserMatrix = yield newUserMatrix.save();
        yield (0, updateLevels_1.updateAllSeventhLevels)(savedUserMatrix, curRefAdd, 0);
    }
    catch (error) {
        console.log('file: user.ts:47  registration  error:', error);
    }
});
const upgrade = (userAddress, curRefAdd, level) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.USER.findOne({
            address: userAddress,
            level,
        });
        if (!user)
            return console.log({
                message: "user not found & level already active & level is out of bound.",
            });
        user.activeLevels[Number(level)] = true;
        yield user.save();
        const newUserMatrix = new matrix_1.MATRIX({
            code: `${level}-${userAddress}`,
            level,
            address: userAddress,
            currentReferrer: curRefAdd,
        });
        const savedUserMatrix = yield newUserMatrix.save();
        yield (0, updateLevels_1.updateAllSeventhLevels)(savedUserMatrix, curRefAdd, Number(level));
    }
    catch (error) {
        console.log("file: user.ts:47  registration  error:", error);
    }
});
