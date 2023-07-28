"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: [true, "please add a name"]
    },
    password: {
        type: String,
        required: [true, 'please provide a password']
    }
});
exports.User = (0, mongoose_1.model)("User", userSchema, "users");
