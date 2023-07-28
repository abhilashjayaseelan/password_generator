import {Schema, model} from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, "please add a name"]
    },
    password: {
        type: String,
        required: [true, 'please provide a password']
    },
    userPasswords: {
        type: Array
    }
})

export const User = model("User", userSchema, "users")

export type UserModel = typeof User;