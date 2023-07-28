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
const dbUserModel_1 = require("../database/dbUserModel");
const userController = () => {
    const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { userName, password } = req.body;
        try {
            const existingUser = yield dbUserModel_1.User.findOne({ userName });
            if (existingUser) {
                return res.status(409).json({ message: "user already exists" });
            }
            const newUser = new dbUserModel_1.User({ userName, password });
            yield newUser.save();
            res.status(201).json({ message: "user created successfully" });
        }
        catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Error registering user" });
        }
    });
    return {
        registerUser,
    };
};
exports.default = userController;
