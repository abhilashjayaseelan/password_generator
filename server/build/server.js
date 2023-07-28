"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = __importDefault(require("./database/dbConnection"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
(0, dbConnection_1.default)();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
