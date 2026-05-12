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
exports.getSixthLevelRef = exports.getFifthLevelRef = exports.getFourthLevelRef = exports.getThirdLevelRef = exports.getSecondLevelRef = exports.getFirstLevelRef = void 0;
const matrix_1 = require("../models/matrix");
function getFirstLevelRef(referrer, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const firstLevelRef1 = yield matrix_1.MATRIX.findOne({
                address: referrer.firstLevel[0],
                level,
            });
            const firstLevelRef2 = yield matrix_1.MATRIX.findOne({
                address: referrer.firstLevel[1],
                level,
            });
            const firstLevelRef3 = yield matrix_1.MATRIX.findOne({
                address: referrer.firstLevel[2],
                level,
            });
            if (!firstLevelRef1 || !firstLevelRef2 || !firstLevelRef3)
                return console.log("first level ref not found");
            if (firstLevelRef1.firstLevel.length <= firstLevelRef2.firstLevel.length &&
                firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length) {
                return firstLevelRef1.address;
            }
            else if (firstLevelRef2.firstLevel.length <= firstLevelRef3.firstLevel.length) {
                return firstLevelRef2.address;
            }
            else {
                return firstLevelRef3.address;
            }
        }
        catch (error) {
            console.log("file: user.ts:117  getFirstLevelRef  error:", error);
        }
    });
}
exports.getFirstLevelRef = getFirstLevelRef;
function getSecondLevelRef(referrer, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const length = 8;
            let referrerAddress;
            const LevelRefs = [];
            for (let i = 0; i < length + 1; i++) {
                const secondLevelRef = yield matrix_1.MATRIX.findOne({
                    address: referrer.secondLevel[i],
                    level,
                });
                if (!secondLevelRef) {
                    return console.log("Second level ref not found");
                }
                LevelRefs.push(secondLevelRef);
            }
            for (let j = 0; j < length; j++) {
                let isRef = true;
                for (let i = j; i < length; i++) {
                    if (LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length) {
                        isRef = false;
                        break; // Exit the loop
                    }
                }
                if (isRef) {
                    referrerAddress = LevelRefs[j].address;
                    break;
                }
                if (j + 1 === length) {
                    referrerAddress = LevelRefs[j + 1].address;
                    break;
                }
            }
            return referrerAddress;
        }
        catch (error) {
            console.log("file: user.ts:161  getSecondLevelRef  error:", error);
        }
    });
}
exports.getSecondLevelRef = getSecondLevelRef;
function getThirdLevelRef(referrer, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const length = 26;
            let referrerAddress;
            const LevelRefs = [];
            for (let i = 0; i < length + 1; i++) {
                const thirdLevelRef = yield matrix_1.MATRIX.findOne({
                    address: referrer.thirdLevel[i],
                    level,
                });
                if (!thirdLevelRef) {
                    return console.log("third level ref not found");
                }
                LevelRefs.push(thirdLevelRef);
            }
            for (let j = 0; j < length; j++) {
                let isRef = true;
                for (let i = j; i < length; i++) {
                    if (LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length) {
                        isRef = false;
                        break; // Exit the loop
                    }
                }
                if (isRef) {
                    referrerAddress = LevelRefs[j].address;
                    break;
                }
                if (j + 1 === length) {
                    referrerAddress = LevelRefs[j + 1].address;
                    break;
                }
            }
            return referrerAddress;
        }
        catch (error) {
            console.log("file: user.ts:205  getThirdLevelRef  error:", error);
        }
    });
}
exports.getThirdLevelRef = getThirdLevelRef;
function getFourthLevelRef(referrer, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const length = 80;
            let referrerAddress;
            const LevelRefs = [];
            for (let i = 0; i < length + 1; i++) {
                const thirdLevelRef = yield matrix_1.MATRIX.findOne({
                    address: referrer.FourthLevel[i],
                    level,
                });
                if (!thirdLevelRef) {
                    return console.log("third level ref not found");
                }
                LevelRefs.push(thirdLevelRef);
            }
            for (let j = 0; j < length; j++) {
                let isRef = true;
                for (let i = j; i < length; i++) {
                    if (LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length) {
                        isRef = false;
                        break; // Exit the loop
                    }
                }
                if (isRef) {
                    referrerAddress = LevelRefs[j].address;
                    break;
                }
                if (j + 1 === length) {
                    referrerAddress = LevelRefs[j + 1].address;
                    break;
                }
            }
            return referrerAddress;
        }
        catch (error) {
            console.log("file: user.ts:249  getFourthLevelRef  error:", error);
        }
    });
}
exports.getFourthLevelRef = getFourthLevelRef;
function getFifthLevelRef(referrer, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const length = 242;
            let referrerAddress;
            const LevelRefs = [];
            for (let i = 0; i < length + 1; i++) {
                const thirdLevelRef = yield matrix_1.MATRIX.findOne({
                    address: referrer.FifthLevel[i],
                    level,
                });
                if (!thirdLevelRef) {
                    return console.log("third level ref not found");
                }
                LevelRefs.push(thirdLevelRef);
            }
            for (let j = 0; j < length; j++) {
                let isRef = true;
                for (let i = j; i < length; i++) {
                    if (LevelRefs[i].firstLevel.length > LevelRefs[i + 1].firstLevel.length) {
                        isRef = false;
                        break; // Exit the loop
                    }
                }
                if (isRef) {
                    referrerAddress = LevelRefs[j].address;
                    break;
                }
                if (j + 1 === length) {
                    referrerAddress = LevelRefs[j + 1].address;
                    break;
                }
            }
            return referrerAddress;
        }
        catch (error) {
            console.log("file: user.ts:293  getFifthLevelRef  error:", error);
        }
    });
}
exports.getFifthLevelRef = getFifthLevelRef;
function getSixthLevelRef(refMatrix, level) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const length = 728;
            let referrerAddress;
            const LevelRefsMatrixes = [];
            for (let i = 0; i < length + 1; i++) {
                const levelRefMatrix = yield matrix_1.MATRIX.findOne({
                    address: refMatrix.SixthLevel[i],
                    level,
                });
                if (!levelRefMatrix) {
                    return console.log("level ref not found");
                }
                LevelRefsMatrixes.push(levelRefMatrix);
            }
            for (let j = 0; j < length; j++) {
                let isRef = true;
                for (let i = j; i < length; i++) {
                    if (LevelRefsMatrixes[i].firstLevel.length >
                        LevelRefsMatrixes[i + 1].firstLevel.length) {
                        isRef = false;
                        break; // Exit the loop
                    }
                }
                if (isRef) {
                    referrerAddress = LevelRefsMatrixes[j].address;
                    break;
                }
                if (j + 1 === length) {
                    referrerAddress = LevelRefsMatrixes[j + 1].address;
                    break;
                }
            }
            return referrerAddress;
        }
        catch (error) {
            console.log("file: user.ts:337  getSixthLevelRef  error:", error);
        }
    });
}
exports.getSixthLevelRef = getSixthLevelRef;
