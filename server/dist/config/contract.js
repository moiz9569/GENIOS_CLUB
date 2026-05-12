"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sdk = exports.provider = void 0;
const sdk_1 = require("@thirdweb-dev/sdk");
const ethers_1 = require("ethers");
const addresses_1 = require("../constant/addresses");
exports.provider = new ethers_1.ethers.providers.JsonRpcProvider(process.env.RPC_URL);
// sdk Setup, you will need clientId and secretKey for the sdk you can get this from thirdweb
exports.sdk = new sdk_1.ThirdwebSDK(addresses_1.ActiveChain, {
    clientId: process.env.CLIENT_ID,
    secretKey: process.env.SECRET_KEY,
});
