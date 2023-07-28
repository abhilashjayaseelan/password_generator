"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const userRouter = () => {
    const route = express_1.default.Router();
    const controller = (0, userController_1.default)();
    route.post('/register', controller.registerUser);
    return route;
};
exports.default = userRouter();
