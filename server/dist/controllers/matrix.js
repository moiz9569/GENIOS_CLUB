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
exports.updateX12Referrer = exports.findActiveReferrer = exports.upgrade = exports.add = exports.getUpgrade = exports.getAdd = exports.view = void 0;
const matrix_1 = require("../models/matrix");
const getLevelrefs_1 = require("../functions/getLevelrefs");
const updateLevels_1 = require("../functions/updateLevels");
const user_1 = require("../models/user");
const view = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level, address } = req.params;
        const referrer = yield matrix_1.MATRIX.findOne({ address, level });
        if (!referrer)
            return res.status(401).json({
                message: "referrer not found.",
            });
        res.status(200).json(referrer);
    }
    catch (e) {
        console.error("Error:", e.message);
        res.status(500).json({
            message: "An error occurred",
        });
    }
});
exports.view = view;
const getAdd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { address } = req.params;
        console.log("file: matrix.ts:36  getAdd  address:", address);
        const ref = yield user_1.USER.findOne({
            address: address,
            level: 0,
        });
        console.log("file: matrix.ts:42  getAdd  ref:", ref);
        if (!ref)
            return res.status(401).json({
                message: "ref not found.",
            });
        const activeRefAdd = yield findActiveReferrer(ref, 0);
        const curRefAdd = yield updateX12Referrer(activeRefAdd, 0);
        console.log("file: matrix.ts:49  getAdd  curRefAdd:", curRefAdd);
        res.status(200).json({ currentReferrer: curRefAdd });
    }
    catch (error) {
        console.log("file: user.ts:47  registration  error:", error);
        res.status(500).json({
            message: "An error occurred",
        });
    }
});
exports.getAdd = getAdd;
const getUpgrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level, address } = req.params;
        const user = yield user_1.USER.findOne({
            address: address,
            level,
        });
        if (!user ||
            !user.activeLevels[Number(level) - 1] ||
            user.activeLevels[Number(level)] ||
            Number(level) >= 8)
            return res.status(401).json({
                message: "ref not found & level already active & level is out of bound.",
            });
        const activeRefAdd = yield findActiveReferrer(user, Number(level));
        const curRefAdd = yield updateX12Referrer(activeRefAdd, Number(level));
        console.log("file: matrix.ts:81  getUpgrade  curRefAdd:", curRefAdd);
        res.status(200).json({ currentReferrer: curRefAdd });
    }
    catch (error) {
        console.log("file: user.ts:47  registration  error:", error);
        res.status(500).json({
            message: "An error occurred",
        });
    }
});
exports.getUpgrade = getUpgrade;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userAddress, referrerAddress } = req.body;
        const ref = yield user_1.USER.findOne({
            address: referrerAddress,
            level: 0,
        });
        if (!ref)
            return res.status(401).json({
                message: "ref not found.",
            });
        const activeRefAdd = yield findActiveReferrer(ref, 0);
        const curRefAdd = yield updateX12Referrer(activeRefAdd, 0);
        const newUser = new user_1.USER({
            address: userAddress,
            referrer: referrerAddress,
        });
        newUser.activeLevels[0] = true;
        const savedUser = yield newUser.save();
        const newUserMatrix = new matrix_1.MATRIX({
            code: `${0}-${userAddress}`,
            level: 0,
            address: userAddress,
            referrer: referrerAddress,
            currentReferrer: curRefAdd,
        });
        const savedUserMatrix = yield newUserMatrix.save();
        yield (0, updateLevels_1.updateAllSeventhLevels)(savedUserMatrix, curRefAdd, 0);
        res.status(200).json({ user: savedUser, matrix: savedUserMatrix });
    }
    catch (error) {
        console.log("file: user.ts:47  registration  error:", error);
        res.status(500).json({
            message: "An error occurred",
        });
    }
});
exports.add = add;
const upgrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level } = req.params;
        const { userAddress } = req.body;
        const user = yield user_1.USER.findOne({
            address: userAddress,
            level,
        });
        if (!user ||
            !user.activeLevels[Number(level) - 1] ||
            user.activeLevels[Number(level)] ||
            Number(level) >= 8)
            return res.status(401).json({
                message: "user not found & level already active & level is out of bound.",
            });
        const activeRefAdd = yield findActiveReferrer(user, Number(level));
        const curRefAdd = yield updateX12Referrer(activeRefAdd, Number(level));
        user.activeLevels[Number(level)] = true;
        const savedUser = yield user.save();
        const newUserMatrix = new matrix_1.MATRIX({
            code: `${level}-${userAddress}`,
            level,
            address: userAddress,
            currentReferrer: curRefAdd,
        });
        const savedUserMatrix = yield newUserMatrix.save();
        yield (0, updateLevels_1.updateAllSeventhLevels)(savedUserMatrix, curRefAdd, Number(level));
        res.status(200).json({ user: savedUser, matrix: savedUserMatrix });
    }
    catch (error) {
        console.log("file: user.ts:47  registration  error:", error);
        res.status(500).json({
            message: "An error occurred",
        });
    }
});
exports.upgrade = upgrade;
function findActiveReferrer(ref, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let referrer = ref;
            while (true) {
                if (!referrer) {
                    return console.log("referrer not found >>>");
                }
                if (referrer.activeLevels[level]) {
                    return referrer.address;
                }
                referrer = yield user_1.USER.findOne({
                    address: referrer.referrer,
                    level,
                });
            }
        }
        catch (error) {
            console.log("file: matrix.ts:101  findActiveReferrer  error:", error);
        }
    });
}
exports.findActiveReferrer = findActiveReferrer;
function updateX12Referrer(referrerAddress, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const referrer = yield matrix_1.MATRIX.findOne({
                address: referrerAddress,
                level,
            });
            if (!referrer) {
                return console.log("Second level ref not found");
            }
            if (referrer.firstLevel.length < 3) {
                return referrer.address;
            }
            else if (referrer.secondLevel.length < 9) {
                return yield (0, getLevelrefs_1.getFirstLevelRef)(referrer, level);
            }
            else if (referrer.thirdLevel.length < 27) {
                return yield (0, getLevelrefs_1.getSecondLevelRef)(referrer, level);
            }
            else if (referrer.FourthLevel.length < 81) {
                return yield (0, getLevelrefs_1.getThirdLevelRef)(referrer, level);
            }
            else if (referrer.FifthLevel.length < 243) {
                return yield (0, getLevelrefs_1.getFourthLevelRef)(referrer, level);
            }
            else if (referrer.SixthLevel.length < 729) {
                return yield (0, getLevelrefs_1.getFifthLevelRef)(referrer, level);
            }
            return yield (0, getLevelrefs_1.getSixthLevelRef)(referrer, level);
        }
        catch (error) {
            console.log("file: user.ts:85  updateX12Referrer  error:", error);
        }
    });
}
exports.updateX12Referrer = updateX12Referrer;
