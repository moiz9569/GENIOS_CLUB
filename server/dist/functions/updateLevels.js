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
exports.resetMatrix = exports.updateAllSeventhLevels = void 0;
const matrix_1 = require("../models/matrix");
const root = "root";
function updateAllSeventhLevels(userMatrix, curRefAdd, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const refMatrix = yield matrix_1.MATRIX.findOne({
                address: curRefAdd,
                level,
            });
            refMatrix.firstLevel.push(userMatrix.address);
            yield refMatrix.save();
            userMatrix.currentReferrer = refMatrix.address;
            yield userMatrix.save();
            if (refMatrix.currentReferrer === root) {
                return;
            }
            let curRefMatrix = yield matrix_1.MATRIX.findOne({
                address: refMatrix.currentReferrer,
                level,
            });
            curRefMatrix.secondLevel.push(userMatrix.address);
            yield curRefMatrix.save();
            if (curRefMatrix.currentReferrer === root) {
                return;
            }
            curRefMatrix = yield matrix_1.MATRIX.findOne({
                address: curRefMatrix.currentReferrer,
                level,
            });
            curRefMatrix.thirdLevel.push(userMatrix.address);
            yield curRefMatrix.save();
            if (curRefMatrix.currentReferrer === root) {
                return;
            }
            curRefMatrix = yield matrix_1.MATRIX.findOne({
                address: curRefMatrix.currentReferrer,
                level,
            });
            curRefMatrix.FourthLevel.push(userMatrix.address);
            yield curRefMatrix.save();
            if (curRefMatrix.currentReferrer === root) {
                return;
            }
            curRefMatrix = yield matrix_1.MATRIX.findOne({
                address: curRefMatrix.currentReferrer,
                level,
            });
            curRefMatrix.FifthLevel.push(userMatrix.address);
            yield curRefMatrix.save();
            if (curRefMatrix.currentReferrer === root) {
                return;
            }
            curRefMatrix = yield matrix_1.MATRIX.findOne({
                address: curRefMatrix.currentReferrer,
                level,
            });
            curRefMatrix.SixthLevel.push(userMatrix.address);
            yield curRefMatrix.save();
            if (curRefMatrix.currentReferrer === root) {
                return;
            }
            curRefMatrix = yield matrix_1.MATRIX.findOne({
                address: curRefMatrix.currentReferrer,
                level,
            });
            curRefMatrix.SeventhLevel.push(userMatrix.address);
            yield curRefMatrix.save();
            resetMatrix(refMatrix, level);
        }
        catch (error) {
            console.log("file: userMatrix.ts:421  updatesecondToSeventhLevel  error:", error);
        }
    });
}
exports.updateAllSeventhLevels = updateAllSeventhLevels;
function resetMatrix(referrer, level) {
    return __awaiter(this, void 0, void 0, function* () {
        if (referrer.SeventhLevel.length < 2187)
            return;
        referrer.firstLevel = [];
        referrer.secondLevel = [];
        referrer.thirdLevel = [];
        referrer.FourthLevel = [];
        referrer.FifthLevel = [];
        referrer.SixthLevel = [];
        referrer.SeventhLevel = [];
        const nextMetrix = yield matrix_1.MATRIX.findOne({
            address: referrer.address,
            level: level + 1,
        });
        if (!nextMetrix.blocked && level < 8 && referrer.address != root) {
            referrer.blocked = true;
        }
        referrer.reinvestCount++;
        yield referrer.save();
        return referrer.address;
    });
}
exports.resetMatrix = resetMatrix;
