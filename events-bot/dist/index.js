"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listenToAllEvents_1 = require("./controller/listenToAllEvents");
const dataBase_1 = __importDefault(require("./config/dataBase"));
const app = (0, express_1.default)();
const port = 5000;
// Database Connection
(0, dataBase_1.default)();
app.get('/', (req, res) => {
    res.send('Genios Club event bot!');
});
// eventsSetup();
(0, listenToAllEvents_1.listenToAllEvents)();
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
